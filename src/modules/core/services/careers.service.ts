import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, MoreThan} from 'typeorm';
import { CreateCareerDto, UpdateCareerDto, FilterCareerDto, PaginationDto} from '@core/dto';
import { CareerEntity } from '@core/entities';
import { InstitutionsService, CataloguesService} from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class CareersService {
  constructor(
    @Inject(RepositoryEnum.CAREER_REPOSITORY)
    private careerRepository: Repository<CareerEntity>,
    private institutionService: InstitutionsService,
    private CataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.careerRepository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
      take: 1000,
    });

    return { 
      pagination: { 
        totalItems: response[1], limit: 10 
      }, 
      data: response[0] 
    };
  }

  async create(payload: CreateCareerDto): Promise<ServiceResponseHttpModel> {
    const newCareer = this.careerRepository.create(payload);

    newCareer.institution = await this.institutionService.findOne(
      payload.institution.id,
    );

    newCareer.modality = await this.CataloguesService.findOne(
      payload.modality.id,
    );

    newCareer.state = await this.CataloguesService.findOne(
      payload.state.id
    );

    newCareer.type = await this.CataloguesService.findOne(
      payload.type.id
    );

    const careerCreated = await this.careerRepository.save(newCareer);
    
    return {data: careerCreated};
  }

  async findAll(params?: FilterCareerDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by search
    if (params.resolutionNumber) {
      return await this.filterByResolutionNumber(params.resolutionNumber);
    }

    //All
    const data = await this.careerRepository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<ServiceResponseHttpModel> {
    const career = await this.careerRepository.findOne({
      relations: ['institution', 'modality', 'state', 'type'],
      where: {
        id
      },
    });

    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    return { data: career };
  }

  async update(id: number, payload: UpdateCareerDto): Promise<ServiceResponseHttpModel> {
    const career = await this.careerRepository.findOneBy({ id });
    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    this.careerRepository.merge(career, payload);
    const careerUpdated = await this.careerRepository.save(career);
    return { data: careerUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const career = await this.careerRepository.findOneBy({ id });
    
    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }

    const careerDeleted = await this.careerRepository.softRemove(career);
    
    return { data: careerDeleted };
  }

  async removeAll(payload: CareerEntity[]): Promise<ServiceResponseHttpModel> {
    const careersDeleted = await this.careerRepository.softRemove(payload);
    return { data: careersDeleted };
  }

  private async paginateAndFilter(params: FilterCareerDto): Promise<ServiceResponseHttpModel> {
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
      where.push({ title: ILike(`%${search}%`) });

    }

    const response = await this.careerRepository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],	
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { 
      pagination: { limit, totalItems: response[1] },
      data: response[0] 
    };
  }

  private async filterByResolutionNumber(resolutionNumber: number): Promise<ServiceResponseHttpModel>{
    const where: FindOptionsWhere<CareerEntity> = {};

    if (resolutionNumber) {
      where.resolutionNumber = MoreThan(resolutionNumber);
    }

    const response = await this.careerRepository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
      where,
    });

    return {
      pagination: { totalItems: response[1], limit: 10 },
      data: response[0]
    };
  }
}
