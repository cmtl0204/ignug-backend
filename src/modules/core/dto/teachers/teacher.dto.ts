import { UserEntity } from '@auth/entities';
import { CareerEntity, InformationTeacherEntity } from '@core/entities';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class TeacherDto {
  @IsOptional()
  careers: CareerEntity[];

  @IsNotEmpty(isNotEmptyValidationOptions())
  user: UserEntity;

  @IsOptional()
  informationTeacher: InformationTeacherEntity;
}
