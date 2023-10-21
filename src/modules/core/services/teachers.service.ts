import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository, FindOptionsWhere} from 'typeorm';
import {UsersService} from '@auth/services';
import {FilterTeacherDto, PaginationDto, UpdateTeacherDto} from '@core/dto';
import {TeacherEntity} from '@core/entities';
import {InformationTeachersService} from '@core/services';
import {CoreRepositoryEnum, MessageEnum} from '@shared/enums';
import {ServiceResponseHttpModel} from '@shared/models';

@Injectable()
export class TeachersService {
    constructor(
        @Inject(CoreRepositoryEnum.TEACHER_REPOSITORY)
        private repository: Repository<TeacherEntity>,
        private usersService: UsersService,
        private informationTeachersService: InformationTeachersService,
    ) {
    }

    async catalogue() {
        const data = await this.repository.findAndCount({
            take: 1000,
        });

        return {pagination: {totalItems: data[1], limit: 10}, data: data[0]};
    }

    async findAll(params?: FilterTeacherDto): Promise<ServiceResponseHttpModel> {
        //Pagination & Filter by search
        if (params?.limit > 0 && params?.page >= 0) {
            return await this.paginateAndFilter(params);
        }

        //All
        const data = await this.repository.findAndCount({
            relations: {user: true, informationTeacher: true},
        });

        return {pagination: {totalItems: data[1], limit: 10}, data: data[0]};
    }

    async findOne(id: string) {
        const teacher = await this.repository.findOne({
            relations: {informationTeacher: true, user: true},
            where: {id},
        });

        if (!teacher) {
            throw new NotFoundException('Teacher not found');
        }

        return teacher;
    }

    async update(id: string, payload: UpdateTeacherDto): Promise<TeacherEntity> {
        const teacher = await this.repository.findOneBy({id});

        if (!teacher) {
            throw new NotFoundException('Teacher not found');
        }

        this.repository.merge(teacher, payload);

        await this.repository.save(teacher);

        await this.usersService.update(payload.user.id, payload.user);

        payload.informationTeacher.teacher = await this.repository.save(teacher);

        if (payload.informationTeacher?.id) {
            await this.informationTeachersService.update(payload.informationTeacher.id, payload.informationTeacher);
        } else {
            const {id, ...informationTeacherRest} = payload.informationTeacher;
            await this.informationTeachersService.create(informationTeacherRest);
        }

        return teacher;
    }

    async remove(id: string) {
        const teacher = await this.repository.findOneBy({id});

        if (!teacher) {
            throw new NotFoundException('Teacher not found');
        }

        return await this.repository.softRemove(teacher);
    }

    async removeAll(payload: TeacherEntity[]) {
        return this.repository.softRemove(payload);
    }

    private async paginateAndFilter(params: FilterTeacherDto) {
        let where: FindOptionsWhere<TeacherEntity> | FindOptionsWhere<TeacherEntity>[];
        where = {};
        let {page, search} = params;
        const {limit} = params;

        if (search) {
            search = search.trim();
            page = 0;
            where = [];
            // where.push({ name: ILike(`%${search}%`) });
        }

        const data = await this.repository.findAndCount({
            relations: {user: true, informationTeacher: true},
            where,
            take: limit,
            skip: PaginationDto.getOffset(limit, page),
        });

        return {pagination: {limit, totalItems: data[1]}, data: data[0]};
    }

    async create(payload: any): Promise<any> {
        const newEntity = this.repository.create(payload);
        return await this.repository.save(newEntity);
    }

    async hide(id: string): Promise<TeacherEntity> {
        const entity = await this.repository.findOneBy({id});

        if (!entity) {
            throw new NotFoundException(MessageEnum.NOT_FOUND);
        }
        entity.isVisible = false;
        return await this.repository.save(entity);
    }

    async reactivate(id: string): Promise<TeacherEntity> {
        const entity = await this.repository.findOneBy({id});

        if (!entity) {
            throw new NotFoundException(MessageEnum.NOT_FOUND);
        }
        entity.isVisible = true;
        return await this.repository.save(entity);
    }
}
