import { InstitutionEntity, CatalogueEntity } from '@core/entities';
import { IsString, MaxLength, MinLength, IsOptional, IsBoolean } from 'class-validator';
import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';
import {UserEntity} from "@auth/entities";

export class CareerDto {
  @IsOptional(isNotEmptyValidationOptions())
  readonly institution: InstitutionEntity;

  @IsOptional(isNotEmptyValidationOptions())
  readonly modality: CatalogueEntity;

  readonly users: UserEntity[];

  @IsOptional()
  readonly state: CatalogueEntity;

  @IsOptional(isNotEmptyValidationOptions())
  readonly type: CatalogueEntity;

  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(10, maxLengthValidationOptions())
  readonly acronym: string;

  @IsString(isStringValidationOptions())
  @MinLength(1, minLengthValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  readonly code: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly codeSniese: string;

  @IsString(isStringValidationOptions())
  readonly degree: string;

  @IsBoolean(isBooleanValidationOptions())
  readonly isVisible: boolean;

  @IsBoolean(isBooleanValidationOptions())
  readonly isEnabled: boolean;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly logo: string;

  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly resolutionNumber: string;

  @IsString(isStringValidationOptions())
  readonly shortName: string;
}
