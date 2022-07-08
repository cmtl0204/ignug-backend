import { Injectable, NotFoundException } from '@nestjs/common';
import { CataloguesService } from '@core/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InformationTeacherEntity } from '@core/entities';
import {
  CreateInformationTeacherDto,
  UpdateInformationTeacherDto,
} from '@core/dto';

@Injectable()
export class InformationTeachersService {
  constructor(
    @InjectRepository(InformationTeacherEntity)
    private InformationTeacherRepository: Repository<InformationTeacherEntity>,
    private cataloguesService: CataloguesService,
  ) {}

  async create(payload: CreateInformationTeacherDto) {
    const informationTeacher =
      this.InformationTeacherRepository.create(payload);
    informationTeacher.teachingLadder = await this.cataloguesService.findOne(
      payload.teachingLadder.id,
    );

    informationTeacher.dedicationTime = await this.cataloguesService.findOne(
      payload.dedicationTime.id,
    );

    informationTeacher.higherEducation = await this.cataloguesService.findOne(
      payload.higherEducation.id,
    );

    informationTeacher.countryHigherEducation =
      await this.cataloguesService.findOne(
        payload.countryHigherEducation.id
        );
    informationTeacher.scholarship = await this.cataloguesService.findOne(
      payload.scholarship.id,
    );

    informationTeacher.scholarshipType = await this.cataloguesService.findOne(
      payload.scholarshipType.id,
    );

    informationTeacher.financingType = await this.cataloguesService.findOne(
      payload.financingType.id,
    );

    informationTeacher.username = await this.cataloguesService.findOne(
      payload.username.id,
    );

    const response = await this.InformationTeacherRepository.save(
      informationTeacher,
    );
    return this.InformationTeacherRepository.save(response);
  }

  async findAll() {
    return await this.InformationTeacherRepository.find({
      relations: [
        'countryHigherEducation',
        'dedicationTime',
        'financingType',
        'higherEducation',
        'scholarship',
        'scholarshipType',
        'teachingLadder',
        'username',
      ],
    });
  }

  async findOne(id: number) {
    const informationTeacher = await this.InformationTeacherRepository.findOne({
      where: {
        id: id,
      },
    });

    if (informationTeacher === null) {
      throw new NotFoundException('El teacher no se encontro');
    }

    return informationTeacher;
  }

  async remove(id: number) {
    return this.InformationTeacherRepository.softDelete(id);
  }

  async update(id: number, payload: UpdateInformationTeacherDto) {
    const informationTeacher = await this.InformationTeacherRepository.findOne({
      where: {
        id: id,
      },
    });

    if (informationTeacher === null) {
      throw new NotFoundException('El docente no se encontro');
    }
    informationTeacher.teachingLadder = await this.cataloguesService.findOne(
      payload.teachingLadder.id,
    );

    informationTeacher.dedicationTime = await this.cataloguesService.findOne(
      payload.dedicationTime.id,
    );

    informationTeacher.higherEducation = await this.cataloguesService.findOne(
      payload.higherEducation.id,
    );

    informationTeacher.countryHigherEducation =
      await this.cataloguesService.findOne(
        payload.countryHigherEducation.id
        );
    informationTeacher.scholarship = await this.cataloguesService.findOne(
      payload.scholarship.id,
    );

    informationTeacher.scholarshipType = await this.cataloguesService.findOne(
      payload.scholarshipType.id,
    );

    informationTeacher.financingType = await this.cataloguesService.findOne(
      payload.financingType.id,
    );

    informationTeacher.username = await this.cataloguesService.findOne(
      payload.username.id,
    );

    informationTeacher.teachingLadder = await this.cataloguesService.findOne(
      payload.teachingLadder.id,
    );
    informationTeacher.dedicationTime = await this.cataloguesService.findOne(
      payload.dedicationTime.id,
    );
    informationTeacher.higherEducation = await this.cataloguesService.findOne(
      payload.higherEducation.id,
    );
    informationTeacher.countryHigherEducation =
      await this.cataloguesService.findOne(
        payload.countryHigherEducation.id
        );
    informationTeacher.scholarship = await this.cataloguesService.findOne(
      payload.scholarship.id,
    );
    informationTeacher.scholarshipType = await this.cataloguesService.findOne(
      payload.scholarshipType.id,
    );
    informationTeacher.financingType = await this.cataloguesService.findOne(
      payload.financingType.id,
    );
    informationTeacher.username = await this.cataloguesService.findOne(
      payload.username.id,
    );

    await this.InformationTeacherRepository.merge(informationTeacher, payload);
    return this.InformationTeacherRepository.save(informationTeacher);
  }
}
