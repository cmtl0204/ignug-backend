import { UserEntity } from '@auth/entities';
import { InformationStudentEntity } from '@core/entities';
import { IsNotEmpty } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class StudentDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  user: UserEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  informationStudent: InformationStudentEntity;
}
