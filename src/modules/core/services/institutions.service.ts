import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CataloguesService } from '../catalogues/catalogues.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InstitutionEntity } from './entities/institution.entity';

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
      payload.addressId,
    );
    newInstitution.state = await this.cataloguesService.findOne(
      payload.stateId,
    );
    return await this.institutionRepository.save(newInstitution);
  }

  async findAll(): Promise<InstitutionEntity[]> {
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
    await this.institutionRepository.merge(institution, payload);
    return await this.institutionRepository.save(institution);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.institutionRepository.softDelete(id);
  }
}
