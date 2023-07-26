import { UserEntity } from '@auth/entities';
import { InformationStudentEntity } from '@core/entities';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class StudentDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  user: UserEntity;

  @IsOptional()
  informationStudent: InformationStudentEntity;
}
