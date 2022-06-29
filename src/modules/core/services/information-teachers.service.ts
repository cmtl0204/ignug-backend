import { Injectable, NotFoundException } from '@nestjs/common';
import { CataloguesService } from '@core/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { InformationTeacherEntity } from '../entities/information-teacher.entity';
import { CreateInformationTeacherDto, UpdateInformationTeacherDto } from '@core/dto';

@Injectable()
export class InformationTeachersService {

  constructor(
    @InjectRepository(InformationTeacherEntity)
    private InformationTeacherRepository: Repository<InformationTeacherEntity>,
    private cataloguesService: CataloguesService

  ) { }


  async create(payload: CreateInformationTeacherDto) {
    const newTeacher = this.InformationTeacherRepository.create(payload);
    newTeacher.teachingLadder = await this.cataloguesService.findOne(
      payload.teachingLadderId,
    );

    newTeacher.dedicationTime = await this.cataloguesService.findOne(
      payload.dedicationTimeId,
    );

    newTeacher.higherEducation = await this.cataloguesService.findOne(
      payload.higherEducationId,
    );

    newTeacher.countryHigherEducation = await this.cataloguesService.findOne(
      payload.countryHigherEducationId,
    );
    newTeacher.scholarship = await this.cataloguesService.findOne(
      payload.scholarshipId,
    );

    newTeacher.scholarshipType = await this.cataloguesService.findOne(
      payload.scholarshipTypeId,
    );

    newTeacher.financingType = await this.cataloguesService.findOne(
      payload.financingTypeId,
    );

    newTeacher.username = await this.cataloguesService.findOne(
      payload.usernameId,
    );

    const response = await this.InformationTeacherRepository.save(newTeacher);
    return this.InformationTeacherRepository.save(response);
  }

  async findAll() {
    return await this.InformationTeacherRepository.find();
  }

  async findOne(id: number) {
    const teacher = await this.InformationTeacherRepository.findOne({
      where: {
        id: id,
      },
    });

    if (teacher === null) {
      throw new NotFoundException('El teacher no se encontro');
    }

    return teacher;
  }

  async remove(id: number) {
    return this.InformationTeacherRepository.softDelete(id);
  }

  async update(id: number, payload: UpdateInformationTeacherDto) {
    const teacher = await this.InformationTeacherRepository.findOne({
      where: {
        id: id,
      },
    });

    if (teacher === null) {
      throw new NotFoundException('El docente no se encontro');
    }

    this.InformationTeacherRepository.merge(teacher, payload);

    return this.InformationTeacherRepository.save(teacher);
  }

}
