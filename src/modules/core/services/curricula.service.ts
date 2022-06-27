import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curricula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurriculumEntity } from 'src/entities/curriculum.entity';

 @Injectable()
export class CurriculaServic {
  constructor(
      @InjectRepository (CurriculumEntity)
      private curriculumRepository: Repository<CurriculumEntity>,
    ) {}
    async create(payload: CreateCurriculumDto) {
      const newCurriculum= this.curriculumRepository.create(payload);
  
      return await this.curriculumRepository.save(newCurriculum);
    }
  
    async remove(id: number) {
      return await this.curriculumRepository.softDelete(id);
    }
  
    async findAll() {
      return await this.curriculumRepository.find();
    }
  
    async findOne(id: number) {
      const curriculum = await this.curriculumRepository.findOne({
        where: {
          id: id,
        },
      });
  
      if (curriculum === null) {
        throw new NotFoundException('El producto no se encontro');
      }
  
      return curriculum;
    }
  
    async update(id: number, payload: UpdateCurriculumDto) {
      const curriculum = await this.curriculumRepository.findOne({
        where: {
          id: id,
        },
      });
  
      if (curriculum === null) {
        throw new NotFoundException('El producto no se encontro');
      }
  
      this.curriculumRepository.merge(curriculum, payload);
  
      return this.curriculumRepository.save(curriculum);
    }
  }
  