import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { SchoolPeriodEntity } from '@core/entities';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
} from '@shared/validation';

export class PartialDto {
  @IsOptional(isNotEmptyValidationOptions())
  readonly schoolPeriod: SchoolPeriodEntity;

  @IsDate()
  readonly date: Date;

  @IsNumber({}, isNumberValidationOptions())
  readonly value: number;
}
