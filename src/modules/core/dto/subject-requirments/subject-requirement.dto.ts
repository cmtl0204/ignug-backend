import { IsNotEmpty } from 'class-validator';
import { SubjectEntity } from '@core/entities';
import { CatalogueCoreSubjectRequirementTypeEnum } from '@shared/enums';

export class SubjectRequirementDto {
  @IsNotEmpty()
  readonly subject: SubjectEntity;

  @IsNotEmpty()
  readonly requirement: SubjectEntity;

  @IsNotEmpty()
  readonly isEnabled: boolean;

  @IsNotEmpty()
  readonly type: CatalogueCoreSubjectRequirementTypeEnum;
}
