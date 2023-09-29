import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSubjectRequirementDto, SeedSubjectRequirementDto } from '@core/dto';
import {SubjectEntity, SubjectRequirementEntity} from '@core/entities';
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

  async create(subjectId:string,payload: SubjectRequirementEntity): Promise<SubjectRequirementEntity> {
    const subjectRequirement = new SubjectRequirementEntity();
    subjectRequirement.subject_id = subjectId;
    subjectRequirement.requirement = payload.requirement;
    subjectRequirement.isEnabled = payload.isEnabled;
    subjectRequirement.type = payload.type;

    const entity = this.repository.create(subjectRequirement);

    return await this.repository.save(entity);
  }

  async removeBySubject(subjectId: string) {
    const subjectRequirements = await this.repository.find({
      where: { subject_id: subjectId },
    });

    await this.repository.softRemove(subjectRequirements);
  }
}
