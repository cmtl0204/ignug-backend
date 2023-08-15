import {IsNotEmpty,IsNumber } from 'class-validator';
import {EnrollmentDetailEntity } from '@core/entities';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
} from '@shared/validation';

export class ClassroomDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
readonly enrollmentDetail: EnrollmentDetailEntity;

@IsNumber({}, isNumberValidationOptions())
  readonly value: number;
}
