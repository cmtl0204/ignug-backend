import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCareerDto, UpdateCareerDto } from '@core/dto';
import { CareerEntity } from '@core/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionsService } from './institutions.service';
import { CataloguesService } from './catalogues.service';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(CareerEntity)
    private careerRepository: Repository<CareerEntity>,
    private institutionService: InstitutionsService,
    private CataloguesService: CataloguesService,
  ) {}

  async create(payload: CreateCareerDto) {
    const newCareer = this.careerRepository.create(payload);

    newCareer.institution = await this.institutionService.findOne(payload.institutionId);

    newCareer.modality = await this.CataloguesService.findOne(payload.modalityId);

    newCareer.state = await this.CataloguesService.findOne(payload.stateId);

    newCareer.type = await this.CataloguesService.findOne(payload.typeId);

    return await this.careerRepository.save(newCareer);
  }

  async findAll() {
    return await this.careerRepository.find();
  }

  async findOne(id: number) {
    const career = await this.careerRepository.findOne({
      where: {
        id: id,
      },
    });

    if (career === null) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    return career;
  }

  async update(id: number, payload: UpdateCareerDto) {
    const career = await this.careerRepository.findOne({
      where: {
        id: id,
      },
    });
    if (career === null) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    this.careerRepository.merge(career, payload);
    return await this.careerRepository.save(career);
  }

  async remove(id: number) {
    return await this.careerRepository.softDelete(id);
  }
}
