import { CatalogueEntity } from '@core/entities';
import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import {
  isDateValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';

export class SchoolPeriodDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: CatalogueEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly code: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly codeSniese: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  readonly shortName: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate(isDateValidationOptions())
  readonly startedAt: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate(isDateValidationOptions())
  readonly endedAt: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate(isDateValidationOptions())
  readonly ordinaryStartedAt: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate(isDateValidationOptions())
  readonly ordinaryEndedAt: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate(isDateValidationOptions())
  readonly extraOrdinaryStartedAt: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate(isDateValidationOptions())
  readonly extraOrdinaryEndedAt: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate(isDateValidationOptions())
  readonly especialStartedAt: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate(isDateValidationOptions())
  readonly especialEndedAt: Date;
}
