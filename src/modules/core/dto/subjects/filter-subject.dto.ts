import { PaginationDto } from '@core/dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterSubjectDto extends PaginationDto {
  @IsOptional()
  @IsNumber({}, { message: 'El campo autonomousHours debe ser un número' })
  readonly autonomousHour: number;

  @IsOptional()
  @IsString({ message: 'El campo code debe ser un string' })
  readonly code: string;

  @IsOptional()
  @IsNumber({}, { message: 'El campo credit debe ser un número' })
  readonly credit: number;

  @IsOptional()
  @IsString({ message: 'El campo name debe ser un string' })
  readonly name: string;

  @IsOptional()
  @IsNumber({}, { message: 'El campo practicalHour debe ser un número' })
  readonly practicalHour: number;

  @IsOptional()
  @IsNumber({}, { message: 'El campo scale debe ser un número' })
  readonly scale: number;

  @IsOptional()
  @IsNumber({}, { message: 'el campo teacherHour debe ser un número' })
  readonly teacherHour: number;
}
