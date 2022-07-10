import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateInformationStudentDto,
  UpdateInformationStudentDto,
} from '@core/dto';
import { InformationStudentEntity } from '@core/entities';
import { CataloguesService } from './catalogues.service';

@Injectable()
export class InformationStudentsService {
  constructor(
    @InjectRepository(InformationStudentEntity)
    private informationStudentRepository: Repository<InformationStudentEntity>,
    private cataloguesService: CataloguesService,
  ) {}

  async create(payload: CreateInformationStudentDto) {
    const newInformationStudent =
      this.informationStudentRepository.create(payload);

    this.informationStudentRepository.create(payload);

    newInformationStudent.isBonusDevelopmentReceive =
      await this.cataloguesService.findOne(
        payload.isBonusDevelopmentReceive.id,
      );

    newInformationStudent.isAncestralLanguage =
      await this.cataloguesService.findOne(payload.isAncestralLanguage.id);

    newInformationStudent.isDegreeSuperior =
      await this.cataloguesService.findOne(payload.isDegreeSuperior.id);

    newInformationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisability.id,
    );

    newInformationStudent.isSubjectRepeat =
      await this.cataloguesService.findOne(payload.isSubjectRepeat.id);

    return await this.informationStudentRepository.save(newInformationStudent);
  }

  async findAll() {
    return await this.informationStudentRepository.find({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
        'student',
      ],
    });
  }

  async findOne(id: number) {
    const informationStudent = await this.informationStudentRepository.findOne({
      where: {
        id: id,
      },
    });

    if (informationStudent === null) {
      throw new NotFoundException('La informacion no se encontro');
    }

    return informationStudent;
  }

  async update(id: number, payload: UpdateInformationStudentDto) {
    const informationStudent = await this.informationStudentRepository.findOne({
      where: {
        id: id,
      },
    });

    if (informationStudent === null) {
      throw new NotFoundException(
        'La informacion del estudiante no se encontro',
      );
    }
    informationStudent.isBonusDevelopmentReceive =
      await this.cataloguesService.findOne(
        payload.isBonusDevelopmentReceive.id,
      );

    informationStudent.isAncestralLanguage =
      await this.cataloguesService.findOne(payload.isAncestralLanguage.id);

    informationStudent.isDegreeSuperior = await this.cataloguesService.findOne(
      payload.isDegreeSuperior.id,
    );

    informationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisability.id,
    );

    informationStudent.isSubjectRepeat = await this.cataloguesService.findOne(
      payload.isSubjectRepeat.id,
    );

    this.informationStudentRepository.merge(informationStudent, payload);
    return await this.informationStudentRepository.save(informationStudent);
  }

  async remove(id: number) {
    return await this.informationStudentRepository.delete(id);
  }
}
