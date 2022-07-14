import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCurriculumDto,
  UpdateCurriculumDto,
  FilterCurriculumDto,
} from '@core/dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOptionsWhere,
  ILike,
  LessThan,
  Equal,
  Like,
} from 'typeorm';
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

  async findAll(params: FilterCurriculumDto) {
    // Filter by search
    if (params.search) return await this.filter(params);

    // Other filters
    if (params.name) return await this.filterByName(params.name);

    // All
    // return await this.pagination(params.limit ?? 15, params.offset ?? 0);
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

  pagination(limit: number, offset: number) {
    return this.curriculumRepository.find({
      relations: ['career', 'state'],
      take: limit,
      skip: offset,
    });
  }

  filter(params: FilterCurriculumDto) {
    const where: FindOptionsWhere<CurriculumEntity>[] = [];

    const { search } = params;

    if (search) {
      where.push({ code: ILike(`%${search}%`) });
      where.push({ description: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ resolutionNumber: ILike(`%${search}%`) });
      // where.push({ periodicAcademicNumber: ILike(`%${search}%`) });
      // where.push({ weeksNumber: ILike(`%${search}%`) });
    }

    return this.curriculumRepository.find({
      relations: ['career', 'state'],
      where,
    });
  }

  filterByDeletedAT(deletedAT: Date) {
    const where: FindOptionsWhere<CurriculumEntity> = {};
    console.log(deletedAT);
    if (deletedAT) {
      where.deletedAT = Equal(deletedAT);
    }

    console.log(where);
    return this.curriculumRepository.find({
      relations: ['career', 'state'],
      where,
    });
  }
  filterByName(name: string) {
    const where: FindOptionsWhere<CurriculumEntity> = {};
    console.log(name);
    if (name) {
      where.name = Like(name);
    }
    console.log(where);
    return this.curriculumRepository.find({
      relations: ['career', 'state'],
      where,
    });
  }
}
