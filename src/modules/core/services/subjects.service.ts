import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import {CreateSubjectDto, UpdateSubjectDto, FilterSubjectDto} from '@core/dto';
import { SubjectEntity } from '@core/entities';
import { PaginationDto } from '@core/dto';
import { CataloguesService, CurriculaService } from '@core/services';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    private catalogueService: CataloguesService,
    private curriculumService: CurriculaService,
  ) {}

  async create(payload: CreateSubjectDto) {
    const newSubject = this.subjectRepository.create(payload);

    newSubject.academicPeriod = await this.catalogueService.findOne(
      payload.academicPeriod.id,
    );
    newSubject.state = await this.catalogueService.findOne(payload.state.id);

    newSubject.type = await this.catalogueService.findOne(payload.type.id);

    newSubject.curriculum = await this.curriculumService.findOne(
      payload.curriculum.id,
    );

    const subjectCreated = await this.subjectRepository.save(newSubject);

    return await this.subjectRepository.save(subjectCreated);
  }

  async catalogue() {
    const data = await this.subjectRepository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findAll(params?: FilterSubjectDto) {
   //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.scale) {
      return this.filterByScale(params.scale);
    }

    if (params.code) {
      return this.filterByCode(params.code);
    }

    //All
    const data = await this.subjectRepository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number) {
    const subject = await this.subjectRepository.findOne({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where: {id},
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  async update(id: number, payload: UpdateSubjectDto) {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    subject.academicPeriod = await this.catalogueService.findOne(
      payload.academicPeriod.id,
    );

    subject.state = await this.catalogueService.findOne(payload.state.id);

    subject.type = await this.catalogueService.findOne(payload.type.id);

    subject.curriculum = await this.curriculumService.findOne(
      payload.curriculum.id,
    );

    this.subjectRepository.merge(subject, payload);

    return  this.subjectRepository.save(subject);
  }

  async remove(id: number) {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return await this.subjectRepository.softRemove(subject);
  }

  async removeAll(payload: SubjectEntity[]) {
    return await this.subjectRepository.softRemove(payload);
  }

  private async paginateAndFilter(params: FilterSubjectDto) {
    let where: FindOptionsWhere<SubjectEntity> | FindOptionsWhere<SubjectEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
    }

    const data = await this.subjectRepository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }

  pagination(limit: number, offset: number) {
    return this.subjectRepository.find({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      take: limit,
      skip: offset,
    });
  }

  filter(params: FilterSubjectDto) {
    const where: FindOptionsWhere<SubjectEntity>[] = [];

    const { search } = params;

    if (search) {
      where.push({ code: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
    }

    return this.subjectRepository.find({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where,
    });
  }

  private async filterByScale(scale: number) {
    const where: FindOptionsWhere<SubjectEntity> = {};

    if (scale) {
      where.scale = LessThan(scale);
    }

    
    const data = await this.subjectRepository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
    });

    return { pagination: { limit: 10, totalItems: data[1] }, data: data[0] };
  }

  private async filterByCode(code: string) {
    const where: FindOptionsWhere<SubjectEntity> = {};

    if (code) {
      where.code = LessThan(code);
    }

    const data = await this.subjectRepository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where,
    });

    return { pagination: { limit: 10, totalItems: data[1] }, data: data[0] };
  }
}
