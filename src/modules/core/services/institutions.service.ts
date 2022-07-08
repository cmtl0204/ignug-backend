import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  ILike,
  LessThan,
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

  async findAll(params?: FilterInstitutionDto): Promise<InstitutionEntity[]> {
    if (params.limit && params.offset) {
      return this.pagination(params.limit, params.offset);
    }
    return await this.institutionRepository.find();
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

  pagination(limit: number, offset: number) {
    return this.institutionRepository.find({
      relations: ['bloodType', 'gender'],
      take: limit,
      skip: offset,
    });
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
      relations: ['bloodType', 'gender'],
      where,
    });
  }

  filterByBirthdate(birthdate: Date) {
    const where: FindOptionsWhere<InstitutionEntity> = {};
    console.log(birthdate);
    if (birthdate) {
      // where.birthdate = LessThan(birthdate);
    }

    console.log(where);
    return this.institutionRepository.find({
      relations: ['bloodType', 'gender'],
      where,
    });
  }
}
