import { CatalogueEntity, SchoolPeriodEntity, SubjectEntity, TeacherEntity } from '@core/entities';
import { IsOptional } from 'class-validator';
import {
  isNotEmptyValidationOptions,

} from '@shared/validation';

export class TeacherDistributiveDto {
  @IsOptional(isNotEmptyValidationOptions())
  readonly parallel: CatalogueEntity;

  @IsOptional(isNotEmptyValidationOptions())
  readonly teacher: TeacherEntity;

  @IsOptional(isNotEmptyValidationOptions())
  readonly schoolPeriod: SchoolPeriodEntity;

  @IsOptional(isNotEmptyValidationOptions())
  readonly subject: SubjectEntity;

  @IsOptional(isNotEmptyValidationOptions())
  readonly workday: CatalogueEntity;

  @IsOptional(isNotEmptyValidationOptions())
  readonly hours: number;

}
