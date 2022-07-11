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
    // Filter by search
    if (params.search) return await this.filter(params);

    // Other filters
    if (params.email) return await this.filterByEmail(params.email);

    // All
    return await this.pagination(params.limit ?? 3, params.offset ?? 0);
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
    const institution = await this.institutionRepository.findOne({
      where: { id },
    });

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

  async pagination(limit: number, offset: number) {
    const data = await this.institutionRepository.find({
      relations: ['address', 'state'],
      order: {
        id: 'ASC',
      },
      take: limit,
      skip: offset,
    });
    const totalItems = await this.institutionRepository.count();
    return { data, totalItems };
  }

  filter(params: FilterInstitutionDto) {
    const where: FindOptionsWhere<InstitutionEntity>[] = [];

    const { search } = params;

    if (search) {
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

    return this.institutionRepository.find({
      relations: ['address', 'state'],
      where,
    });
  }

  filterByEmail(email: string) {
    const where: FindOptionsWhere<InstitutionEntity> = {};
    if (email) {
      // where.email = Not(email);
    }
    return this.institutionRepository.find({
      relations: ['address', 'state'],
      where,
    });
  }
  filterByWeb(web: string) {
    const where: FindOptionsWhere<InstitutionEntity> = {};
    if (web) {
      where.email = Equal(web);
    }
    return this.institutionRepository.find({
      relations: ['address', 'state'],
      where,
    });
  }
}
