import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { CreateCareerDto, UpdateCareerDto, FilterCareerDto } from '@core/dto';
import { CareerEntity } from '@core/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionsService } from './institutions.service';
import { CataloguesService } from './catalogues.service';
import { PaginationDto } from '../dto/pagination/pagination.dto';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(CareerEntity)
    private careerRepository: Repository<CareerEntity>,
    private institutionService: InstitutionsService,
    private CataloguesService: CataloguesService,
  ) {}

  async catalogue() {
    const data = await this.careerRepository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }
  async create(payload: CreateCareerDto) {
    const newCareer = this.careerRepository.create(payload);

    newCareer.institution = await this.institutionService.findOne(
      payload.institution.id,
    );

    newCareer.modality = await this.CataloguesService.findOne(
      payload.modality.id,
    );

    newCareer.state = await this.CataloguesService.findOne(payload.state.id);

    newCareer.type = await this.CataloguesService.findOne(payload.type.id);
    return await this.careerRepository.save(newCareer);
  }

  async findAll(params?: FilterCareerDto) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }
    //All
    const data = await this.careerRepository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number) {
    const career = await this.careerRepository.findOne({
      relations: ['institution', 'modality', 'state', 'type'],
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
    const career = await this.careerRepository.findOneBy({ id });
    if (career === null) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    this.careerRepository.merge(career, payload);
    return await this.careerRepository.save(career);
  }

  async remove(id: number) {
    const career = await this.careerRepository.findOneBy({ id });
    if (career === null) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }

    return await this.careerRepository.softRemove(career);
  }

  async removeAll(payload: CareerEntity[]) {
    return await this.careerRepository.softRemove(payload);
  }

  private async paginateAndFilter(params: FilterCareerDto) {
    let where:
      | FindOptionsWhere<CareerEntity>
      | FindOptionsWhere<CareerEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 1;
      where = [];
      where.push({ acronym: ILike(`%${search}%`) });
      where.push({ code: ILike(`%${search}%`) });
      where.push({ codeSniese: ILike(`%${search}%`) });
      where.push({ logo: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      //where.push({ resolutionNumber: ILike(`%${search}%`) });
      where.push({ shortName: ILike(`%${search}%`) });
      where.push({ title: ILike(`%${search}%`) });
    }

    const data = await this.careerRepository.findAndCount({
      relations: ['bloodType', 'gender'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }
}
