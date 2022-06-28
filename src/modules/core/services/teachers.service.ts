import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeacherDto } from '@core/dto';
import { UpdateTeacherDto } from '@core/dto';
import { Repository } from 'typeorm';
import { TeacherEntity } from '@core/entities';
import { CataloguesService } from '@core/services';

@Injectable()
export class TeachersService {
  teachers: any[] = [];
  id = 1;

  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
    private cataloguesService: CataloguesService

  ) { }


  async create(payload: CreateTeacherDto) {
    const newTeacher = this.teacherRepository.create(payload);
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
    return this.teacherRepository.save(newTeacher);
  }

  async findAll() {
    return await this.teacherRepository.find();
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepository.findOne({
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
    return this.teacherRepository.softDelete(id);
  }

  async update(id: number, payload: UpdateTeacherDto) {
    const teacher = await this.teacherRepository.findOne({
      where: {
        id: id,
      },
    });

    if (teacher === null) {
      throw new NotFoundException('El docente no se encontro');
    }

    this.teacherRepository.merge(teacher, payload);

    return this.teacherRepository.save(teacher);
  }

}
