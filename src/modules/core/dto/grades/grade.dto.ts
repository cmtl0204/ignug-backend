import { IsNotEmpty, IsDate, MinLength, IsOptional } from 'class-validator';
import { EnrollmentDetailEntity } from '@core/entities';

export class GradeDto {
  @IsOptional()
  enrollmentDetail: EnrollmentDetailEntity;

  @IsDate({ message: 'El campo value debe ser un numero' })
  @MinLength(5, { message: 'El value debe tener un numero valido' })
  readonly value: number;
}
