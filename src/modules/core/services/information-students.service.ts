import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInformationStudentDto,UpdateInformationStudentDto,} from '@core/dto';
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
    const newInformationsStudent =
      this.informationStudentRepository.create(payload);

    this.informationStudentRepository.create(payload);

    newInformationsStudent.isBonusDevelopmentReceive =
      await this.cataloguesService.findOne(payload.isBonusDevelopmentReceiveId);

    newInformationsStudent.isAncestralLanguage =
      await this.cataloguesService.findOne(payload.isAncestralLanguageId);

    newInformationsStudent.isDegreeSuperior =
      await this.cataloguesService.findOne(payload.isDegreeSuperiorId);

    newInformationsStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisabilityId,
    );


    newInformationsStudent.isSubjectRepeat =
      await this.cataloguesService.findOne(payload.isSubjectRepeatId);

    return await this.informationStudentRepository.save(newInformationsStudent);
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
      await this.cataloguesService.findOne(payload.isBonusDevelopmentReceiveId);

    informationStudent.isAncestralLanguage =
      await this.cataloguesService.findOne(payload.isAncestralLanguageId);
    informationStudent.isDegreeSuperior = await this.cataloguesService.findOne(
      payload.isDegreeSuperiorId,
    );
    informationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisabilityId,
    );
    informationStudent.isSubjectRepeat = await this.cataloguesService.findOne(
      payload.isSubjectRepeatId,
    );

    this.informationStudentRepository.merge(informationStudent, payload);
    return  await this.informationStudentRepository.save(informationStudent);
  }

  async remove(id: number) {
    return await this.informationStudentRepository.delete(id);
  }
}
