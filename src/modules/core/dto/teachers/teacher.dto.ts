import { UserEntity } from '@auth/entities';
import { InformationTeacherEntity } from '@core/entities';
import { IsNotEmpty, IsOptional} from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class TeacherDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  user: UserEntity;

  @IsOptional()
  informationTeacher: InformationTeacherEntity;
}
