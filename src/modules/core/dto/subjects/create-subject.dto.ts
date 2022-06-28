import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateSubjectDto {
  @IsNumber({}, { message: 'El campo academicPeriodId debe ser un número' })
  @IsPositive({
    message: 'El campo academicPeriodId debe ser un entero positivo',
  })
  readonly academicPeriodId: number;

  @IsNumber({}, { message: 'El campo curriculumId debe ser un número' })
  @IsPositive({ message: 'El campo curriculumId debe ser un entero positivo' })
  readonly curriculumId: number;

  @IsNumber({}, { message: 'El campo stateId debe ser un número' })
  @IsPositive({ message: 'El campo stateId debe ser un entero positivo' })
  readonly stateId: number;

  @IsNumber({}, { message: 'El campo typeId debe ser un número' })
  @IsPositive({ message: 'El campo typeId debe ser un entero positivo' })
  readonly typeId: number;

  @IsNumber({}, { message: 'Debe ser un número' })
  @Min(0, { message: 'El número mínimo es 0' })
  readonly autonomousHour: number;

  @IsNumber({}, { message: 'Debe ser un número' })
  @Min(0, { message: 'El número mínimo es 0' })
  @IsOptional()
  readonly credit: number;

  @IsString({ message: 'Debe ser un string' })
  @MinLength(4, { message: 'El número de caracteres mínimo es 4' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly name: string;

  @IsNumber({}, { message: 'Debe ser un número' })
  @Min(0, { message: 'El número mínimo es 0' })
  readonly practicalHour: number;

  @IsNumber({}, { message: 'Debe ser un número' })
  @Min(0, { message: 'El número mínimo es 0' })
  @Max(1, { message: 'El número maximo es 1' })
  readonly scale: number;

  @IsNumber({}, { message: 'Debe ser un número' })
  @Min(0, { message: 'El número mínimo es 0' })
  readonly teacherHour: number;
}
