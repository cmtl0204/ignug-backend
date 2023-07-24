import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  CreateCareerDto,
  FilterCareerDto,
  PaginationDto,
  UpdateCareerDto,
} from '@core/dto';
import { CareerEntity } from '@core/entities';
import { CataloguesService, InstitutionsService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { CoreRepositoryEnum } from '@shared/enums';

@Injectable()
export class CareersService {
  constructor(
    @Inject(CoreRepositoryEnum.CAREER_REPOSITORY)
    private repository: Repository<CareerEntity>,
    private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
      take: 1000,
    });

    return {
      pagination: {
        totalItems: response[1],
        limit: 10,
      },
      data: response[0],
    };
  }

  async create(payload: CreateCareerDto): Promise<CareerEntity> {
    const newCareer = this.repository.create(payload);

    return await this.repository.save(newCareer);
  }

  async findAll(params?: FilterCareerDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.repository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<CareerEntity> {
    const career = await this.repository.findOne({
      relations: ['institution', 'modality', 'state', 'type'],
      where: {
        id,
      },
    });

    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontró`);
    }

    return career;
  }

  async update(id: string, payload: UpdateCareerDto): Promise<CareerEntity> {
    const career = await this.repository.findOneBy({ id });

    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }

    this.repository.merge(career, payload);

    return await this.repository.save(career);
  }

  async remove(id: string): Promise<CareerEntity> {
    const career = await this.repository.findOneBy({ id });

    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }

    return await this.repository.softRemove(career);
  }

  async removeAll(payload: CareerEntity[]): Promise<CareerEntity[]> {
    return await this.repository.softRemove(payload);
  }

  private async paginateAndFilter(
    params: FilterCareerDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CareerEntity>
      | FindOptionsWhere<CareerEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ acronym: ILike(`%${search}%`) });
      where.push({ code: ILike(`%${search}%`) });
      where.push({ codeSniese: ILike(`%${search}%`) });
      where.push({ logo: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ shortName: ILike(`%${search}%`) });
      where.push({ degree: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      pagination: { limit, totalItems: response[1] },
      data: response[0],
    };
  }
}
