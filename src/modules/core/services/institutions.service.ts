import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  Equal,
  FindOptionsWhere,
  ILike,
  Not,
  Repository,
} from 'typeorm';
import { CreateInstitutionDto, UpdateInstitutionDto } from '@core/dto';
import { CataloguesService } from '@core/services';
import { InstitutionEntity } from '@core/entities';
import { FilterInstitutionDto } from '../dto/institutions/filter-institution.dto';
import { PaginationDto } from '@core/dto';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(InstitutionEntity)
    private institutionRepository: Repository<InstitutionEntity>,
    private cataloguesService: CataloguesService,
  ) {}

  async create(payload: CreateInstitutionDto): Promise<InstitutionEntity> {
    const newInstitution = this.institutionRepository.create(payload);
    newInstitution.address = await this.cataloguesService.findOne(
      payload.address.id,
    );
    newInstitution.state = await this.cataloguesService.findOne(
      payload.state.id,
    );
    return await this.institutionRepository.save(newInstitution);
  }

  async findAll(params?: FilterInstitutionDto) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.email) {
      return this.filterByNotEmail(params.email);
    }

    //All
    const data = await this.institutionRepository.findAndCount({
      relations: ['address', 'state'],
    });
    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<InstitutionEntity> {
    const institution = await this.institutionRepository.findOne({
      where: { id },
    });
    if (institution === null)
      throw new NotFoundException('not found institution');
    return institution;
  }

  async update(
    id: number,
    payload: UpdateInstitutionDto,
  ): Promise<InstitutionEntity> {
    const institution = await this.institutionRepository.findOneBy({ id });

    if (institution === null)
      throw new NotFoundException('not found institution');
    institution.address = await this.cataloguesService.findOne(
      payload.address.id,
    );
    institution.state = await this.cataloguesService.findOne(payload.state.id);
    await this.institutionRepository.merge(institution, payload);
    return await this.institutionRepository.save(institution);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.institutionRepository.softDelete(id);
  }

  async removeAll(payload: InstitutionEntity[]) {
    return await this.institutionRepository.softRemove(payload);
  }

  private async paginateAndFilter(params: FilterInstitutionDto) {
    let where:
      | FindOptionsWhere<InstitutionEntity>
      | FindOptionsWhere<InstitutionEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ acronym: ILike(`%${search}`) });
      where.push({ cellphone: ILike(`%${search}`) });
      where.push({ code: ILike(`%${search}`) });
      where.push({ codeSniese: ILike(`%${search}`) });
      where.push({ denomination: ILike(`%${search}`) });
      where.push({ email: ILike(`%${search}`) });
      where.push({ logo: ILike(`%${search}`) });
      where.push({ name: ILike(`%${search}`) });
      where.push({ phone: ILike(`%${search}`) });
      where.push({ shortName: ILike(`%${search}`) });
      where.push({ slogan: ILike(`%${search}`) });
      where.push({ web: ILike(`%${search}`) });
    }

    const data = await this.institutionRepository.findAndCount({
      relations: ['address', 'state'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }

  async filterByNotEmail(email: string) {
    const where: FindOptionsWhere<InstitutionEntity> = {};
    if (email) where.email = Not(email);
    const data = await this.institutionRepository.findAndCount({
      relations: ['address', 'state'],
      where,
    });
    return {
      pagination: { limit: 10, totalItems: data[1] },
      data: data[0],
    };
  }
  async filterByWeb(web: string) {
    const where: FindOptionsWhere<InstitutionEntity> = {};
    if (web) where.email = Equal(web);
    const data = await this.institutionRepository.findAndCount({
      relations: ['address', 'state'],
      where,
    });
    return {
      pagination: { limit: 10, totalItems: data[1] },
      data: data[0],
    };
  }
}
 