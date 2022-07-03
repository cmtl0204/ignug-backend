import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CataloguesService, CurriculaService } from '@core/services';
import { Repository } from 'typeorm';
import { CreateSubjectDto, UpdateSubjectDto } from '@core/dto';
import { SubjectEntity } from '@core/entities';
import { QueryFailedError } from 'typeorm/browser';

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
      payload.academicPeriodId,
    );
    newSubject.state = await this.catalogueService.findOne(payload.stateId);

    newSubject.type = await this.catalogueService.findOne(payload.typeId);

    newSubject.curriculum = await this.curriculumService.findOne(
      payload.curriculumId,
    );
    const response = await this.subjectRepository.save(newSubject);
    return await this.subjectRepository.save(response);
  }

  async findAll() {
    return await this.subjectRepository.find();
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
      payload.academicPeriodId,
    );

    subject.state = await this.catalogueService.findOne(payload.stateId);

    subject.type = await this.catalogueService.findOne(payload.typeId);

    subject.curriculum = await this.curriculumService.findOne(
      payload.curriculumId,
    );

    this.subjectRepository.merge(subject, payload);
    return this.subjectRepository.save(subject);
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
}
