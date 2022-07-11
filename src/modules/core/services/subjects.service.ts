import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CataloguesService, CurriculaService } from '@core/services';
import { FindOptionsWhere, ILike, LessThan, Repository } from 'typeorm';
import {
  CreateSubjectDto,
  UpdateSubjectDto,
  FilterSubjectDto,
} from '@core/dto';
import { SubjectEntity } from '@core/entities';

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
    const response = await this.subjectRepository.save(newSubject);
    return await this.subjectRepository.save(response);
  }

  async findAll(params?: FilterSubjectDto) {
    //Pagination
    if (params.limit && params.page) {
      return this.pagination(params.limit, params.page);
    }

    //Filter by search
    if (params.search) {
      return this.filter(params);
    }

    return await this.subjectRepository.find({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
    });
  }

  async findOne(id: number) {
    const subject = await this.subjectRepository.findOne({
      where: {
        id,
      },
    });

    if (subject === null) {
      throw new NotFoundException('La asignatura no se encontro');
    }

    return subject;
  }

  async update(id: number, payload: UpdateSubjectDto) {
    const subject = await this.subjectRepository.findOne({
      where: {
        id,
      },
    });

    if (subject === null) {
      throw new NotFoundException('La asignatura no se encontro');
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
    return await this.subjectRepository.save(subject);
  }

  async remove(id: number) {
    const subject = await this.subjectRepository.findOne({
      where: {
        id,
      },
    });

    if (subject === null) {
      throw new NotFoundException('La asignatura no se encontro');
    }

    await this.subjectRepository.softDelete(id);
    return true;
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

  filterByScale(scale: number) {
    const where: FindOptionsWhere<SubjectEntity> = {};
    console.log(scale);
    if (scale) {
      where.scale = LessThan(scale);
    }

    console.log(where);
    return this.subjectRepository.find({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where,
    });
  }

  filterByCode(code: string) {
    const where: FindOptionsWhere<SubjectEntity> = {};
    console.log(code);
    if (code) {
      where.code = LessThan(code);
    }

    console.log(where);
    return this.subjectRepository.find({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where,
    });
  }
}
