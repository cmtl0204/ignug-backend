import {BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import {plainToInstance} from 'class-transformer';
import {Repository} from 'typeorm';
import {add, isBefore} from 'date-fns';
import {UserEntity, TransactionalCodeEntity} from '@auth/entities';
import {PayloadTokenModel} from '@auth/models';
import {AuthRepositoryEnum, MailSubjectEnum, MailTemplateEnum} from '@shared/enums';
import {
    LoginDto,
    PasswordChangeDto,
    ReadProfileDto,
    ReadUserInformationDto,
    UpdateProfileDto,
    UpdateUserInformationDto,
} from '@auth/dto';
import {ServiceResponseHttpModel} from '@shared/models';
import {MailService} from '@common/services';
import {join} from 'path';
import * as fs from 'fs';
import {config} from '@config';
import {ConfigType} from '@nestjs/config';
import {MailDataInterface} from '../../common/interfaces/mail-data.interface';
import {SchoolPeriodsService} from '@core/services';
import {UsersService} from './users.service';

@Injectable()
export class AuthService {
    private readonly MAX_ATTEMPTS = 3;

    constructor(
        @Inject(AuthRepositoryEnum.USER_REPOSITORY)
        private repository: Repository<UserEntity>,
        @Inject(AuthRepositoryEnum.TRANSACTIONAL_CODE_REPOSITORY)
        private transactionalCodeRepository: Repository<TransactionalCodeEntity>,
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
        private readonly userService: UsersService,
        private jwtService: JwtService,
        private readonly nodemailerService: MailService,
        private readonly schoolPeriodsService: SchoolPeriodsService,
    ) {
    }

    async changePassword(id: string, payload: PasswordChangeDto): Promise<boolean> {
        const user = await this.repository.findOneBy({id});

        if (!user) {
            throw new NotFoundException('Usuario no encontrado para cambio de contraseña');
        }

        const isMatchPassword = await this.checkPassword(payload.oldPassword, user, false);

        if (!isMatchPassword) {
            throw new BadRequestException('La contraseña anterior no coincide.');
        }

        if (payload.confirmationPassword !== payload.newPassword) {
            throw new BadRequestException('Las contraseñas no coinciden.');
        }

        user.password = payload.newPassword;

        await this.repository.save(user);

        return true;
    }

    async login(payload: LoginDto): Promise<ServiceResponseHttpModel> {
        const user: UserEntity = (await this.repository.findOne({
            where: {
                username: payload.username,
            },
            relations: {
                roles: true,
                institutions: true,
                careers: {institution: true, curriculums: true},
                teacher: {careers: true},
                student: {careers: true},
            },
        })) as UserEntity;

        if (!user || !(await this.checkPassword(payload.password, user))) {
            throw new UnauthorizedException(`Usuario y/o contraseña no válidos`);
        }

        if (user?.suspendedAt) throw new UnauthorizedException({
            error: 'Cuenta Suspendida',
            message: 'Su usuario se encuentra suspendido',
        });

        if (user?.maxAttempts === 0) throw new UnauthorizedException('Ha excedido el número máximo de intentos permitidos');

        if (!(await this.checkPassword(payload.password, user))) {
            const attempts = user.maxAttempts - 1;
            throw new UnauthorizedException(`Usuario y/o contraseña no válidos, ${attempts} intentos restantes`);
        }

        const userUpdate = await this.repository.findOne({
            where: {username: payload.username},
            select: {password: false},
        });

        const {password, ...userRest} = userUpdate;

        userUpdate.maxAttempts = this.MAX_ATTEMPTS;
        userUpdate.activatedAt = new Date();

        await this.repository.update(userUpdate.id, userRest);

        const accessToken = this.generateJwt(user);

        console.log(accessToken);

        const schoolPeriod = await this.schoolPeriodsService.findOpenSchoolPeriod();
        return {data: {accessToken, user, schoolPeriod}};
    }

    async findProfile(id: string): Promise<ReadProfileDto> {
        const user = await this.repository.findOne({
            where: {id},
            relations: {
                bloodType: true,
                ethnicOrigin: true,
                identificationType: true,
                gender: true,
                maritalStatus: true,
                sex: true,
            },
        });

        if (!user) {
            throw new NotFoundException('El perfil no existe');
        }

        return plainToInstance(ReadProfileDto, user);
    }

    async findUserInformation(id: string): Promise<ReadUserInformationDto> {
        const user = await this.repository.findOneBy({id});

        if (!user) {
            throw new NotFoundException('Información de usuario no existe');
        }

        return plainToInstance(ReadUserInformationDto, user);
    }

    async updateUserInformation(id: string, payload: UpdateUserInformationDto): Promise<ReadUserInformationDto> {
        const user = await this.userService.findOne(id);

        if (!user) {
            throw new NotFoundException('Usuario no encontrado para actualizar información');
        }

        this.repository.merge(user, payload);
        const userUpdated = await this.repository.save(user);

        return plainToInstance(ReadUserInformationDto, userUpdated);
    }

    async updateProfile(id: string, payload: UpdateProfileDto): Promise<ReadProfileDto> {
        const user = await this.repository.findOneBy({id});

        if (!user) {
            throw new NotFoundException('Usuario no encontrado para actualizar el perfil');
        }

        const profileUpdated = await this.repository.update(id, payload);

        return plainToInstance(ReadProfileDto, profileUpdated);
    }

    refreshToken(user: UserEntity): ServiceResponseHttpModel {
        const accessToken = this.generateJwt(user);

        return {data: {accessToken, user}};
    }

    async requestTransactionalCode(username: string): Promise<ServiceResponseHttpModel> {
        const user = await this.repository.findOne({
            where: {username},
        });

        if (!user) {
            throw new NotFoundException({
                error: 'Usuario no encontrado para generar código transaccional',
                message: 'Intente de nuevo',
            });
        }
        const randomNumber = Math.random();
        const token = randomNumber.toString().substring(2, 8);

        const mailData: MailDataInterface = {
            to: user.email || user.personalEmail,
            subject: MailSubjectEnum.RESET_PASSWORD,
            template: MailTemplateEnum.TRANSACTIONAL_CODE,
            data: {
                token,
                user,
            },
        };
        await this.nodemailerService.sendMail(mailData);

        const payload = {username: user.username, token, type: 'password_reset'};

        await this.transactionalCodeRepository.save(payload);

        const value = user.email || user.personalEmail;
        const chars = 3; // Cantidad de caracters visibles

        const email = value.replace(
            /[a-z0-9\-_.]+@/gi,
            c =>
                c.substr(0, chars) +
                c
                    .split('')
                    .slice(chars, -1)
                    .map(v => '*')
                    .join('') +
                '@',
        );

        return {data: email};
    }

    async verifyTransactionalCode(token: string, username: string): Promise<ServiceResponseHttpModel> {
        const transactionalCode = await this.transactionalCodeRepository.findOne({
            where: {token},
        });

        if (!transactionalCode) {
            throw new BadRequestException({
                message: 'Código Transaccional no válido',
                error: 'Error',
            });
        }

        if (transactionalCode.username !== username) {
            throw new BadRequestException({
                message: 'El usuario no corresponde al código transaccional generado',
                error: 'Error',
            });
        }

        if (transactionalCode.isUsed) {
            throw new BadRequestException({
                message: 'El código ya fue usado',
                error: 'Error',
            });
        }

        const maxDate = add(transactionalCode.createdAt, {minutes: 10});

        if (isBefore(maxDate, new Date())) {
            throw new BadRequestException({
                message: 'El código ha expirado',
                error: 'Error',
            });
        }

        transactionalCode.isUsed = true;

        await this.transactionalCodeRepository.save(transactionalCode);

        return {data: true};
    }

    async resetPassword(payload: any): Promise<ServiceResponseHttpModel> {
        const user = await this.repository.findOne({
            where: {username: payload.username},
        });

        if (!user) {
            throw new NotFoundException({
                message: 'Intente de nuevo',
                error: 'Usuario no encontrado para resetear contraseña',
            });
        }

        user.maxAttempts = this.MAX_ATTEMPTS;
        user.password = payload.newPassword;
        user.passwordChanged = true;

        await this.repository.save(user);

        return {data: true};
    }

    async uploadAvatar(file: Express.Multer.File, id: string): Promise<UserEntity> {
        const entity = await this.repository.findOneBy({id});

        if (entity?.avatar) {
            try {
                fs.unlinkSync(join(process.cwd(), 'assets', entity.avatar));
            } catch (err) {
                console.error('Something wrong happened removing the file', err);
            }
        }
        entity.avatar = `avatars/${file.filename}`;
        const {password, ...restEntity} = entity;

        return await this.repository.save({...restEntity});
    }

    private generateJwt(user: UserEntity): string {
        // const expiresDate = new Date();

        // expiresDate.setDate(expiresDate.getSeconds() + 10);

        const payload: PayloadTokenModel = {id: user.id};

        return this.jwtService.sign(payload, {secret: this.configService.jwtSecret, expiresIn: '10s'},);
    }

    private async findByUsername(username: string): Promise<UserEntity> {
        return (await this.repository.findOne({
            where: {
                username,
            },
        })) as UserEntity;
    }

    private async checkPassword(passwordCompare: string, user: UserEntity, reduceAttempts = true): Promise<null | UserEntity> {
        const {password, ...userRest} = user;
        const isMatch = Bcrypt.compareSync(passwordCompare, password);

        if (isMatch) {
            userRest.maxAttempts = 3;
            await this.repository.save(userRest);
            return user;
        }

        if (reduceAttempts) {
            userRest.maxAttempts = userRest.maxAttempts > 0 ? userRest.maxAttempts - 1 : 0;
            await this.repository.save(userRest);
        }

        return null;
    }

    async generatePDF() {
        const pdf: Buffer = await new Promise(resolve => {
            // const doc = new PDFDocument();

            // doc.text('hello world', 100, 50);

            // const buffer = [];
            // doc.on('data', buffer.push.bind(buffer));
            // doc.on('end', () => resolve(Buffer.concat(buffer)));
            // doc.end();f
        });

        const mailData: MailDataInterface = {
            to: 'cesar.tamayo0204@gmail.com',
            subject: MailSubjectEnum.RESET_PASSWORD,
            template: MailTemplateEnum.TEST,
            data: {
                token: 'asd',
            },
            // attachments: [{ filename: 'test.pdf', file: pdf }, { filename: 'test.pdf', path: 'test.pdf' }],
        };

        return await this.nodemailerService.sendMail(mailData);

    }
}
