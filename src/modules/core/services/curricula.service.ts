import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurriculumDto, UpdateCurriculumDto } from '@core/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurriculumEntity } from '@core/entities';
import { CareersService } from '@core/services';
import { CataloguesService } from '@core/services';

@Injectable()
export class CurriculaService {
  constructor(
    @InjectRepository(CurriculumEntity)
    private curriculumRepository: Repository<CurriculumEntity>,
    private carrierService: CareersService,
    private catalogueService: CataloguesService,
  ) {}

  async create(payload: CreateCurriculumDto) {
    const newCurriculum = this.curriculumRepository.create(payload);
    newCurriculum.career = await this.carrierService.findOne(payload.career.id);
    newCurriculum.state = await this.catalogueService.findOne(payload.state.id);

    return await this.curriculumRepository.save(newCurriculum);
  }

  async remove(id: number) {
    return await this.curriculumRepository.softDelete(id);
  }

  async findAll() {
    return await this.curriculumRepository.find({
      relations: ['state', 'career'],
    });
  }

  async findOne(id: number) {
    const curriculum = await this.curriculumRepository.findOne({
      where: {
        id,
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
        id,
      },
    });

    if (curriculum === null) {
      throw new NotFoundException('El producto no se encontro');
    }

    curriculum.career = await this.carrierService.findOne(payload.career.id);
    curriculum.state = await this.catalogueService.findOne(payload.state.id);

    this.curriculumRepository.merge(curriculum, payload);

    return this.curriculumRepository.save(curriculum);
  }
}
