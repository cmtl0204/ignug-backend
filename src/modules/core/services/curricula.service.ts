import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurriculumDto ,UpdateCurriculumDto} from '@core/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurriculumEntity} from '@core/entities';
import { CareersService } from '@core/services';
import { CataloguesService } from '@core/services';

 @Injectable()
export class CurriculaService {
  constructor(
      @InjectRepository (CurriculumEntity)
      private curriculumRepository: Repository<CurriculumEntity>,
      private carrierService:CareersService,
      private catalogueService:CataloguesService
      
    ) {}

    async create(payload: CreateCurriculumDto) {
      const newCurriculum= this.curriculumRepository.create(payload);
      newCurriculum.career= await this.carrierService.findOne(payload.careerId);
      newCurriculum.started= await this.catalogueService.findOne(payload.stateId);

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
  
      curriculum.career= await this.carrierService.findOne(payload.careerId);
      curriculum.started= await this.catalogueService.findOne(payload.stateId);
      
      this.curriculumRepository.merge(curriculum, payload);
  
      return this.curriculumRepository.save(curriculum);
    }
  }
  