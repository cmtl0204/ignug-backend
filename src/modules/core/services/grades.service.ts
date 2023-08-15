import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import { CreateGradeDto, FilterGradeDto, UpdateGradeDto } from '@core/dto';
import { GradeEntity, EnrollmentDetailEntity } from '@core/entities';
import { PaginationDto } from '@core/dto';
import { CataloguesService, EnrollmentsDetailService, EnrollmentsService, SubjectsService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { CoreRepositoryEnum, MessageEnum } from '@shared/enums';

@Injectable()
export class GradesService {
  constructor(
    @Inject(CoreRepositoryEnum.GRADE_REPOSITORY)
    private repository: Repository<GradeEntity>,
  ) {}

  async create(payload: CreateGradeDto): Promise<GradeEntity> {
    const newSubject = this.repository.create(payload);

    return await this.repository.save(newSubject);
  }

  async findAll(params?: FilterGradeDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.value) {
      return this.filterByValue(params.value);
    }

    //All
    const data = await this.repository.findAndCount({
      relations: ['enrollmentDetail'],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: string): Promise<GradeEntity> {
    const subject = await this.repository.findOne({
      relations: ['enrollmentDetail'],
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException('Grade not found');
    }

    return subject;
  }

  async update(id: string, payload: UpdateGradeDto): Promise<GradeEntity> {
    const subject = await this.repository.findOneBy({ id });

    if (!subject) {
      throw new NotFoundException('Grade not found');
    }

    this.repository.merge(subject, payload);

    return await this.repository.save(subject);
  }

  async remove(id: string): Promise<GradeEntity> {
    const subject = await this.repository.findOneBy({ id });

    if (!subject) {
      throw new NotFoundException('Grade not found');
    }

    return await this.repository.save(subject);
  }

  async removeAll(payload: GradeEntity[]): Promise<GradeEntity[]> {
    return await this.repository.softRemove(payload);
  }

  private async paginateAndFilter(params: FilterGradeDto): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<GradeEntity> | FindOptionsWhere<GradeEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ enrollmentDetail: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      relations: ['created_at', 'updated_at', 'deleted_at', 'value'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByValue(value: number): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<GradeEntity> = {};

    if (value) {
      where.value = LessThan(value);
    }

    const response = await this.repository.findAndCount({
      relations: ['created_at', 'updated_at', 'deleted_at', 'value'],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
