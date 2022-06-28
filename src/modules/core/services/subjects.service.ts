import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CataloguesService } from '@core/services';
import { Repository } from 'typeorm';
import { CreateSubjectDto, UpdateSubjectDto } from '@core/dto';
import { SubjectEntity } from '@core/entities';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    private catalogueService: CataloguesService,
  ) {}

  async create(payload: CreateSubjectDto) {
    const newSubject = this.subjectRepository.create(payload);
    newSubject.academicPeriod = await this.catalogueService.findOne(
      payload.academicPeriodId,
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
        id: id,
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
        id: id,
      },
    });

    if (subject === null) {
      throw new NotFoundException('La asignatura no se encontro');
    }

    this.subjectRepository.merge(subject, payload);
    return this.subjectRepository.save(subject);
  }

  async remove(id: number) {
    return await this.subjectRepository.softDelete(id);
  }
}
