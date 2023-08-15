import { IsNotEmpty, IsDate, MinLength, IsOptional } from 'class-validator';
import { EnrollmentDetailEntity} from '@core/entities';

export class GradeDto {
  @IsOptional()
  enrollmentDetail: EnrollmentDetailEntity;

  @IsDate({ message: 'El campo date debe ser una fecha' })
  @MinLength(5, { message: 'El campo date debe tener una fecha valida' })
  readonly createdAt: Date;

  @IsDate({ message: 'El campo date debe ser una fecha' })
  @MinLength(5, { message: 'El campo date debe tener una fecha valida' })
  readonly updatedAt: Date;

  @IsDate({ message: 'El campo date debe ser una fecha' })
  @MinLength(5, { message: 'El campo date debe tener una fecha valida' })
  readonly deletedAt: Date;

  /** Columns **/
  @IsDate({ message: 'El campo value debe ser un numero' })
  @MinLength(5, { message: 'El value debe tener un numero valido' })
  readonly value: number;

}

