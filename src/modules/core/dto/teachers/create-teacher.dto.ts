import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinDate,
  MinLength,
} from 'class-validator';


export class CreateTeacherDto {

  @IsString({ message: 'Debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres' })
  readonly academicUnit: string;//pendiente de revisar
  @IsNumber({}, { message: 'El campo tiene que ser númerico.' })
  @Min(0, { message: 'El número de caracteres mínimo es 0.' })
  readonly administrativeHours: number;

  @IsNumber({}, { message: 'El campo tiene que ser númerico.' })
  @Min(0, { message: 'El número de caracteres mínimo es 0.' })
  readonly classHours: number;

  @IsNumber({}, { message: 'El campo tiene que ser númerico.' })
  @Min(0, { message: 'El número de caracteres mínimo es 0.' })
  readonly communityHours: number;

  @IsString({ message: 'Debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres' })
  readonly degreeHigherEducation: string;
  
  @IsNumber({}, { message: 'El campo tiene que ser númerico.' })
  @Min(0, { message: 'El número de caracteres mínimo es 0.' })
  readonly hoursWorked: number;

  @IsOptional({ message: 'El campo es opcional.' })
  @IsDateString({ message: 'El campo lleva las fechas de los dias festivos.' })
  readonly holidays: Date;

  @IsOptional({ message: 'El campo es opcional.' })
  @IsDateString({ message: 'El campo es tipo fecha' })
  readonly homeVacation: Date;

  @IsNumber({}, { message: 'El campo tiene que ser númerico.' })
  @Min(0, { message: 'El número de caracteres mínimo es 0.' })
  readonly investigationHours: number;

  @IsString({ message: 'Debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres' })
  readonly institutionHigherEducation: string;

  @IsString({ message: 'Debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres' })
  readonly otherHours: string;

  @IsNumber({}, { message: 'El campo tiene que ser númerico.' })
  @Min(1, { message: 'El número de caracteres mínimo es 0.' })
  readonly publications: number; //pendiente de revisar
 
  @IsNumber({}, { message: 'El campo tiene que ser númerico.' })
  @Min(0, { message: 'El número de caracteres mínimo es 0.' })
  readonly scholarshipAmount: number; 

  @IsNumber({}, { message: 'El campo tiene que ser númerico.' })
  @Min(0, { message: 'El número de caracteres mínimo es 0.' })
  readonly totalSubjects: number;

  @IsString({ message: 'Debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres' })
  readonly technical: string;

  @IsString({ message: 'Debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres' })
  readonly technology: string;

  @IsNumber({}, { message: 'El campo tiene que ser númerico.' })
  @Min(0, { message: 'El número de caracteres mínimo es 0.' })
  readonly totalPublications: number;

}