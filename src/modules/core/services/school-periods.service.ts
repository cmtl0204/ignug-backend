import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  CreateSchoolPeriodDto,
  FilterSchoolPeriodDto,
  PaginationDto,
  UpdateSchoolPeriodDto,
} from '@core/dto';
import { SchoolPeriodEntity } from '@core/entities';
import { CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { CoreRepositoryEnum, MessageEnum } from '@shared/enums';

@Injectable()
export class SchoolPeriodsService {
  constructor(
    @Inject(CoreRepositoryEnum.SCHOOL_PERIOD_REPOSITORY)
    private repository: Repository<SchoolPeriodEntity>,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({
      relations: ['state'],
      take: 1000,
    });

    return {
      data: response[0],
      pagination: {
        totalItems: response[1],
        limit: 1000,
      },
    };
  }

  async create(payload: CreateSchoolPeriodDto): Promise<SchoolPeriodEntity> {
    const newEntity = this.repository.create(payload);
    return await this.repository.save(newEntity);
  }

  async findAll(
    params?: FilterSchoolPeriodDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.repository.findAndCount({
      relations: ['state'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<SchoolPeriodEntity> {
    const entity = await this.repository.findOne({
      relations: ['state'],
      where: {
        id,
      },
    });

    if (!entity) {
      throw new NotFoundException(MessageEnum.NOT_FOUND);
    }

    return entity;
  }

  async update(
    id: string,
    payload: UpdateSchoolPeriodDto,
  ): Promise<SchoolPeriodEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(MessageEnum.NOT_FOUND);
    }

    this.repository.merge(entity, payload);

    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<SchoolPeriodEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(MessageEnum.NOT_FOUND);
    }

    return await this.repository.softRemove(entity);
  }

  async removeAll(
    payload: SchoolPeriodEntity[],
  ): Promise<SchoolPeriodEntity[]> {
    return await this.repository.softRemove(payload);
  }

  private async paginateAndFilter(
    params: FilterSchoolPeriodDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<SchoolPeriodEntity>
      | FindOptionsWhere<SchoolPeriodEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
      where.push({ codeSniese: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ shortName: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      relations: ['state'],
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
