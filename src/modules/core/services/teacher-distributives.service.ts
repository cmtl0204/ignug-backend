import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  CreateTeacherDistributiveDto,
  FilterTeacherDistributiveDto,
  PaginationDto,
  UpdateTeacherDistributiveDto,
} from '@core/dto';
import { TeacherDistributiveEntity } from '@core/entities';
import { CoreRepositoryEnum, MessageEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';

@Injectable()
export class TeacherDistributivesService {
  constructor(
    @Inject(CoreRepositoryEnum.TEACHER_DISTRIBUTIVE_REPOSITORY)
    private repository: Repository<TeacherDistributiveEntity>,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({
      relations: ['parallel', 'teacher', 'schoolPeriod', 'subject', 'workday'],
      take: 1000,
    });

    return {
      pagination: {
        totalItems: response[1],
        limit: 1000,
      },
      data: response[0],
    };
  }

  async create(payload: CreateTeacherDistributiveDto): Promise<TeacherDistributiveEntity> {
    const newEntity:TeacherDistributiveEntity = this.repository.create(payload);
    return await this.repository.save(newEntity);
  }

  async findAll(params?: FilterTeacherDistributiveDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field
    //All
    const data = await this.repository.findAndCount({
      relations: ['parallel', 'teacher', 'schoolPeriod', 'subject', 'workday'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<TeacherDistributiveEntity> {
    const entity = await this.repository.findOne({
      relations: ['parallel', 'teacher', 'schoolPeriod', 'subject', 'workday'],
      where: {
        id,
      },
    });

    if (!entity) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontró`);
    }

    return entity;
  }

  async update(id: string, payload: UpdateTeacherDistributiveDto): Promise<TeacherDistributiveEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(MessageEnum.NOT_FOUND);
    }

    this.repository.merge(entity, payload);

    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<TeacherDistributiveEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }

    return await this.repository.softRemove(entity);
  }

  async removeAll(payload: TeacherDistributiveEntity[]): Promise<TeacherDistributiveEntity[]> {
    return await this.repository.softRemove(payload);
  }

  private async paginateAndFilter(
    params: FilterTeacherDistributiveDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TeacherDistributiveEntity>
      | FindOptionsWhere<TeacherDistributiveEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      //where.push({ acronym: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      relations: ['parallel', 'teacher', 'schoolPeriod', 'subject', 'workday'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

}
