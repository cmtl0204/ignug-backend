import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SeedSubjectRequirementDto } from '@core/dto';
import { SubjectRequirementEntity } from '@core/entities';
import { CoreRepositoryEnum } from '@shared/enums';

@Injectable()
export class SubjectRequirementsService {
  constructor(
    @Inject(CoreRepositoryEnum.SUBJECT_REQUIREMENT_REPOSITORY)
    private repository: Repository<SubjectRequirementEntity>,
  ) {}

  async createPrerequisite(payload: SeedSubjectRequirementDto): Promise<SubjectRequirementEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }
}
