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
  @IsPositive({message: 'El campo academicPeriodId debe ser un entero positivo'})
  readonly academicPeriodId: number;

  @IsNumber({}, { message: 'El campo autonomousHours Debe ser un número' })
  @Min(0, { message: 'El número mínimo es 0' })
  readonly autonomousHour: number;

  @IsString({ message: 'El campo code Debe ser un string' })
  @MinLength(5, { message: 'El número de caracteres mínimo es 5' })
  @MaxLength(100, { message: 'El número maximo de caracteres es 100' })
  readonly code: string;

  @IsNumber({}, { message: 'El campo credit Debe ser un número' })
  @Min(0, { message: 'El número mínimo es 0' })
  @IsOptional()
  readonly credit: number;

  @IsNumber({}, { message: 'El campo curriculumId debe ser un número' })
  @IsPositive({ message: 'El campo curriculumId debe ser un entero positivo' })
  readonly curriculumId: number;

  @IsString({ message: 'El campo name Debe ser un string' })
  @MinLength(4, { message: 'El número de caracteres mínimo es 4' })
  @MaxLength(255, { message: 'El numero Maximo 255 caracteres' })
  readonly name: string;

  @IsNumber({}, { message: 'El campo practicalHour Debe ser un número' })
  @Min(0, { message: 'El número mínimo es 0' })
  readonly practicalHour: number;

  @IsNumber({}, { message: 'El campo scale Debe ser un número' })
  @Min(0, { message: 'El número mínimo es 0' })
  @Max(1, { message: 'El número maximo es 1' })
  readonly scale: number;

  @IsNumber({}, { message: 'El campo stateId debe ser un número' })
  @IsPositive({ message: 'El campo stateId debe ser un entero positivo' })
  readonly stateId: number;

  @IsNumber({}, { message: 'el campo teacherHour Debe ser un número' })
  @Min(0, { message: 'El número mínimo es 0' })
  readonly teacherHour: number;

  @IsNumber({}, { message: 'El campo typeId debe ser un número' })
  @IsPositive({ message: 'El campo typeId debe ser un entero positivo' })
  readonly typeId: number;
<<<<<<< HEAD
=======

  @IsNumber({}, { message: 'El campo autonomousHours debe ser un número' })
  @Min(0, { message: 'El número mínimo del campo autonomousHours debe ser 0' })
  readonly autonomousHour: number;

  @IsString({ message: 'El campo code debe ser un string' })
  @MinLength(5, { message: 'El campo code debe tener mínimo 5 caracteres' })
  @MaxLength(100, { message: 'El campo code debe tener maximo 100 caracteres' })
  readonly code: string;

  @IsNumber({}, { message: 'El campo credit debe ser un número' })
  @Min(0, { message: 'El número mínimo del campo credit debe ser 0' })
  @IsOptional()
  readonly credit: number;

  @IsString({ message: 'El campo name debe ser un string' })
  @MinLength(4, { message: 'El campo name debe tener mínimo 4 caracteres' })
  @MaxLength(255, { message: 'El campo name debe tener maximo 255 caracteres' })
  readonly name: string;

  @IsNumber({}, { message: 'El campo practicalHour debe ser un número' })
  @Min(0, { message: 'El número mínimo del campo practicalHour debe ser 0' })
  readonly practicalHour: number;

  @IsNumber({}, { message: 'El campo scale debe ser un número' })
  @Min(0, { message: 'El número mínimo del campo scale debe ser 0' })
  @Max(1, { message: 'El número maximo del campo scale debe ser 1' })
  readonly scale: number;

  @IsNumber({}, { message: 'el campo teacherHour debe ser un número' })
  @Min(0, { message: 'El número mínimo del campo teacherHour debe ser 0' })
  readonly teacherHour: number;
>>>>>>> 9350dee7688935a42a07ba27fe29eb1a5b4ee2be
}
