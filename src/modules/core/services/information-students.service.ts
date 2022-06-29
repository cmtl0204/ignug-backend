import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import {
  CreateInformationStudentDto,
  UpdateInformationStudentDto,
} from '@core/dto';

import { InformationStudentEntity } from '@core/entities';

@Injectable()
export class InformationStudentsService {
  constructor(
    @InjectRepository(InformationStudentEntity)
    private informationStudentRepository: Repository<InformationStudentEntity>,
  ) {}

  async create(payload: CreateInformationStudentDto) {
    const newInformationStudent =
      this.informationStudentRepository.create(payload);

    return await this.informationStudentRepository.save(newInformationStudent);
  }

  async findAll() {
    return await this.informationStudentRepository.find();
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
      throw new NotFoundException('La informacion no se encontro');
    }

    this.informationStudentRepository.merge(informationStudent, payload);

    return this.informationStudentRepository.save(informationStudent);
  }

  async remove(id: number) {
    return await this.informationStudentRepository.delete(id);
  }
}
