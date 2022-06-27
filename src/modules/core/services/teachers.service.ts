import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeacherDto } from './dto/create-teachers.dto';
import { UpdateTeacherDto } from './dto/update-teachers.dto';
import { Repository } from 'typeorm';
import { TeacherEntity } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  teachers: any[] = [];
  id = 1;

  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
  ) { }


  async create(payload: CreateTeacherDto) {
    const newTeacher = this.teacherRepository.create(payload);

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
