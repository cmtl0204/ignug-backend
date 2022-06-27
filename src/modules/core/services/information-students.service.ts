import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateInformationStudentDto } from './dtos/create-information-student.dto';
import { UpdateInformationStudentDto } from './dtos/update-information-student.dto';
import { InformationStudentEntity } from './entities/information-student.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InformationStudentsService {

    informationStudent: any[] = [];
    id = 1;

    constructor(
      @InjectRepository(InformationStudentEntity)
      private informationStudentRepository: Repository<InformationStudentEntity>,

    
    ) {}
  
    async create(payload: CreateInformationStudentDto) {
      const newInformationsStudent = this.informationStudentRepository.create(payload);
      return await this.informationStudentRepository.save(newInformationsStudent);
      
    }
  
    async delete(id: number) {
      return await this.informationStudentRepository.softDelete(id);
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
  }