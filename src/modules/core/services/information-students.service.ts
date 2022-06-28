import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInformationStudentDto, UpdateInformationStudentDto } from '@core/dto';
import { CataloguesService } from '@core/services';
import { InformationStudentEntity } from '@core/entities';

@Injectable()
export class InformationStudentsService {
    constructor(
      @InjectRepository(InformationStudentEntity)
      private informationStudentRepository: Repository<InformationStudentEntity>,
      private cataloguesService: CataloguesService,
    ) {}
  
    async create(payload: CreateInformationStudentDto) {
      const newInformationsStudent = this.informationStudentRepository.create(payload);
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