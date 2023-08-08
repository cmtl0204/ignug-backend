import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { add, isBefore } from 'date-fns';
import { UserEntity, TransactionalCodeEntity } from '@auth/entities';
import { PayloadTokenModel } from '@auth/models';
import {
  AuthRepositoryEnum,
  MailSubjectEnum,
  MailTemplateEnum,
} from '@shared/enums';
import {
  LoginDto,
  PasswordChangeDto,
  ReadProfileDto,
  ReadUserInformationDto,
  UpdateProfileDto,
  UpdateUserInformationDto,
} from '@auth/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { UsersService } from '@auth/services';
import { MailService } from '@common/services';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class AuthService {
  private readonly MAX_ATTEMPTS = 3;

  constructor(
    @Inject(AuthRepositoryEnum.USER_REPOSITORY)
    private repository: Repository<UserEntity>,
    @Inject(AuthRepositoryEnum.TRANSACTIONAL_CODE_REPOSITORY)
    private transactionalCodeRepository: Repository<TransactionalCodeEntity>,
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private readonly nodemailerService: MailService,
  ) {}

  async changePassword(
    id: string,
    payload: PasswordChangeDto,
  ): Promise<boolean> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatchPassword = await this.checkPassword(payload.oldPassword, user);

    if (!isMatchPassword) {
      throw new BadRequestException('The old password is not match.');
    }

    if (payload.confirmationPassword !== payload.newPassword) {
      throw new BadRequestException('The passwords do not match.');
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
        teacher: true,
        student: true,
      },
    })) as UserEntity;

    if (user && user?.suspendedAt)
      throw new UnauthorizedException('Su usuario se encuentra suspendido');

    if (user && user?.maxAttempts === 0)
      throw new UnauthorizedException(
        'Ha excedido el número máximo de intentos permitidos',
      );

    if (user && !(await this.checkPassword(payload.password, user))) {
      const attempts = user.maxAttempts - 1;
      throw new UnauthorizedException(
        `Usuario y/o contraseña no válidos, ${attempts} intentos restantes`,
      );
    }

    if (!user || !(await this.checkPassword(payload.password, user))) {
      throw new UnauthorizedException(`Usuario y/o contraseña no válidos`);
    }

    user.activatedAt = new Date();
    // Include foreign keys
    const { password, student, teacher, roles, institutions, ...userRest } =
      user;

    userRest.maxAttempts = this.MAX_ATTEMPTS;
    await this.repository.update(userRest.id, userRest);

    const accessToken = this.generateJwt(user);

    return { data: { accessToken, user } };
  }

  async findProfile(id: string): Promise<ReadProfileDto> {
    const user = await this.repository.findOne({
      where: { id },
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
      throw new NotFoundException('User not found');
    }

    return plainToInstance(ReadProfileDto, user);
  }

  async findUserInformation(id: string): Promise<ReadUserInformationDto> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(ReadUserInformationDto, user);
  }

  async updateUserInformation(
    id: string,
    payload: UpdateUserInformationDto,
  ): Promise<ReadUserInformationDto> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.repository.merge(user, payload);
    const userUpdated = await this.repository.save(user);

    return plainToInstance(ReadUserInformationDto, userUpdated);
  }

  async updateProfile(
    id: string,
    payload: UpdateProfileDto,
  ): Promise<ReadProfileDto> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profileUpdated = await this.repository.update(id, payload);

    return plainToInstance(ReadProfileDto, profileUpdated);
  }

  refreshToken(user: UserEntity): ServiceResponseHttpModel {
    const accessToken = this.generateJwt(user);

    return { data: { accessToken, user } };
  }

  async requestTransactionalCode(
    username: string,
  ): Promise<ServiceResponseHttpModel> {
    const user = await this.repository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException({
        error: 'Usuario no encontrado',
        message: 'Intente de nuevo',
      });
    }
    const randomNumber = Math.random();
    const token = randomNumber.toString().substring(2, 8);

    await this.nodemailerService.sendMail(
      user.email,
      MailSubjectEnum.RESET_PASSWORD,
      MailTemplateEnum.TRANSACTIONAL_CODE,
      { token, user },
    );

    const payload = { username: user.username, token, type: 'password_reset' };

    await this.transactionalCodeRepository.save(payload);

    const value = user.email;
    const chars = 3; // Cantidad de caracters visibles

    const email = value.replace(
      /[a-z0-9\-_.]+@/gi,
      (c) =>
        c.substr(0, chars) +
        c
          .split('')
          .slice(chars, -1)
          .map((v) => '*')
          .join('') +
        '@',
    );

    return { data: email };
  }

  async verifyTransactionalCode(
    token: string,
  ): Promise<ServiceResponseHttpModel> {
    const transactionalCode = await this.transactionalCodeRepository.findOne({
      where: { token },
    });

    if (!transactionalCode) {
      throw new BadRequestException({
        message: 'Código Transaccional no válido',
        error: 'Error',
      });
    }

    if (transactionalCode.isUsed) {
      throw new BadRequestException({
        message: 'El código ya fue usado',
        error: 'Error',
      });
    }
    const maxDate = add(transactionalCode.createdAt, { minutes: 10 });

    if (isBefore(maxDate, new Date())) {
      throw new BadRequestException({
        message: 'El código ha expirado',
        error: 'Error',
      });
    }

    transactionalCode.isUsed = true;

    await this.transactionalCodeRepository.save(transactionalCode);

    return { data: true };
  }

  async resetPassword(payload: any): Promise<ServiceResponseHttpModel> {
    const user = await this.repository.findOne({
      where: { username: payload.username },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'Intente de nuevo',
        error: 'Usuario no encontrado',
      });
    }

    user.maxAttempts = this.MAX_ATTEMPTS;
    user.password = payload.newPassword;
    user.passwordChanged = true;

    await this.repository.save(user);

    return { data: true };
  }

  async uploadAvatar(
    file: Express.Multer.File,
    id: string,
  ): Promise<UserEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (entity?.avatar) {
      try {
        fs.unlinkSync(
          `${join(process.cwd())}/src/resources/public/${entity.avatar}`,
        );
      } catch (err) {
        console.error('Something wrong happened removing the file', err);
      }
    }
    entity.avatar = `avatars/${file.filename}`;
    const { password, ...restEntity } = entity;

    return await this.repository.save({ ...restEntity });
  }

  private generateJwt(user: UserEntity): string {
    const payload: PayloadTokenModel = { id: user.id };
    return this.jwtService.sign(payload);
  }

  private async findByUsername(username: string): Promise<UserEntity> {
    return (await this.repository.findOne({
      where: {
        username,
      },
    })) as UserEntity;
  }

  private async checkPassword(
    passwordCompare: string,
    user: UserEntity,
  ): Promise<null | UserEntity> {
    const { password, ...userRest } = user;
    const isMatch = Bcrypt.compareSync(passwordCompare, password);

    if (isMatch) {
      userRest.maxAttempts = 3;
      await this.repository.save(userRest);
      return user;
    }

    userRest.maxAttempts =
      userRest.maxAttempts > 0 ? userRest.maxAttempts - 1 : 0;
    await this.repository.save(userRest);

    return null;
  }
}
