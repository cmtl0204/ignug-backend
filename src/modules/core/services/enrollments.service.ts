import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import { CreateEnrollmentDto, FilterEnrollmentDto, UpdateEnrollmentDto } from '@core/dto';
import { EnrollmentEntity } from '@core/entities';
import { PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { CoreRepositoryEnum, MessageEnum } from '@shared/enums';

@Injectable()
export class EnrollmentsService {
  constructor(
    @Inject(CoreRepositoryEnum.ENROLLMENT_REPOSITORY)
    private repository: Repository<EnrollmentEntity>,
  ) {}

  async create(payload: CreateEnrollmentDto): Promise<EnrollmentEntity> {
    const newSubject = this.repository.create(payload);

    return await this.repository.save(newSubject);
  }

  async findAll(params?: FilterEnrollmentDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    // if (params.code) {
    //   return this.filterByCode(params.code);
    // }

    //All
    const data = await this.repository.findAndCount({
      relations: ['curriculum'],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: string): Promise<EnrollmentEntity> {
    const subject = await this.repository.findOne({
      relations: ['curriculum'],
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException('Enrollment not found');
    }

    return subject;
  }

  async update(id: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
    const subject = await this.repository.findOneBy({ id });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    this.repository.merge(subject, payload);

    return await this.repository.save(subject);
  }

  async remove(id: string): Promise<EnrollmentEntity> {
    const subject = await this.repository.findOneBy({ id });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return await this.repository.save(subject);
  }

  async removeAll(payload: EnrollmentEntity[]): Promise<EnrollmentEntity[]> {
    return await this.repository.softRemove(payload);
  }

  private async paginateAndFilter(params: FilterEnrollmentDto): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<EnrollmentEntity> | FindOptionsWhere<EnrollmentEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      relations: ['curriculum'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByCode(code: string): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<EnrollmentEntity> = {};

    if (code) {
      where.code = LessThan(code);
    }

    const response = await this.repository.findAndCount({
      relations: ['curriculum'],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
  async findEnrollmentCertificateByStudent(identificationUser:string,codeSchoolPeriod:string){
    const enrollmentCertificate= await this.repository.findOne({
      relations: {academicPeriod:true, enrollmentDetails:true, curriculum:true,workday:true, schoolPeriod:true, },
      where: { student:{user:{identification:identificationUser}}, schoolPeriod:{code:codeSchoolPeriod}},
    });

    if (!enrollmentCertificate) {
      throw new NotFoundException('Enrollment not found');
    }
    return enrollmentCertificate;
  }
}
