import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateLocationDto } from '@core/dto';
import { CoreRepositoryEnum } from '@shared/enums';
import { LocationEntity } from '../entities/location.entity';
import { InstitutionEntity } from '@core/entities';

@Injectable()
export class LocationsService {
  constructor(
    @Inject(CoreRepositoryEnum.LOCATION_REPOSITORY)
    private repository: Repository<LocationEntity>,
  ) {}

  async create(payload: CreateLocationDto): Promise<LocationEntity> {
    const entity = this.repository.create(payload);

    return await this.repository.save(entity);
  }

  async findByIdTemp(idTemp: string): Promise<LocationEntity> {
    const entity = await this.repository.findOne({ where: { idTemp } });
    // if (!entity) throw new NotFoundException('DPA no encontrada');
    return entity;
  }
}
