import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  IsNotEmpty
} from 'class-validator';
import { CatalogueEntity } from '@core/entities';

export class CreateInformationTeacherDto {

  @IsNotEmpty()
  readonly countryHigherEducation: CatalogueEntity;

  @IsNotEmpty()
  readonly dedicationTime: CatalogueEntity;

  @IsNotEmpty()
  readonly financingType: CatalogueEntity;

  @IsNotEmpty()
  readonly higherEducation: CatalogueEntity;

  @IsNotEmpty()
  readonly scholarship: CatalogueEntity;

  @IsNotEmpty()
  readonly scholarshipType: CatalogueEntity;

  @IsNotEmpty()
  readonly teachingLadder: CatalogueEntity;
  
  @IsNotEmpty()
  readonly username: CatalogueEntity;

  @IsString({ message: 'academicUnit debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres academia' })
  readonly academicUnit: string;

  @IsNumber(
    {},
    { message: 'El campo administrativeHours tiene que ser númerico.' },
  )
  @Min(0, {
    message: 'El campo administrativeHours número de caracteres mínimo es 0.',
  })
  readonly administrativeHours: number;

  @IsNumber({}, { message: 'El campo classHours tiene que ser númerico.' })
  @Min(0, { message: 'El campo classHours número de caracteres mínimo es 0.' })
  readonly classHours: number;

  @IsNumber({}, { message: 'El campo communityHours tiene que ser númerico.' })
  @Min(0, {
    message: 'El número de caracteres del campo communityHours  mínimo es 0.',
  })
  readonly communityHours: number;

  @IsString({ message: 'degreeHigherEducation debe ser un texto' })
  @MaxLength(255, {
    message: 'Debe tener como Maximo 255 caracteres degreeHigherEducation',
  })
  readonly degreeHigherEducation: string;

  @IsNumber({}, { message: 'El campo hoursWorked tiene que ser númerico.' })
  @Min(0, {
    message: 'El número de caracteres mínimo es 0 en el campo hoursWorked.',
  })
  readonly hoursWorked: number;

  @IsOptional({ message: 'El campo holidays es opcional.' })
  @IsDate({
    message: 'El campo holidays lleva las fechas de los dias festivos.',
  })
  readonly holidays: Date;

  @IsOptional({ message: 'El campo homeVacation es opcional.' })
  @IsDate({ message: 'El campo homeVacation es tipo fecha' })
  readonly homeVacation: Date;

  @IsNumber(
    {},
    { message: 'El campo investigationHours tiene que ser númerico.' },
  )
  @Min(0, {
    message:
      'El número de caracteres mínimo es 0 en el campo investigationHours.',
  })
  readonly investigationHours: number;

  @IsString({ message: 'institutionHigherEducation debe ser un texto' })
  @MaxLength(255, {
    message: 'Debe tener como Maximo 255 caracteres institutionHigherEducation',
  })
  readonly institutionHigherEducation: string;

  @IsString({ message: 'otherHours debe ser un texto' })
  @MaxLength(255, {
    message: 'Debe tener como Maximo 255 caracteres el campo otherHours',
  })
  readonly otherHours: string;

  @IsNumber({}, { message: 'El campo publications tiene que ser númerico.' })
  @Min(1, {
    message: 'El número de caracteres mínimo es 0 en el campo publications.',
  })
  readonly publications: number;

  @IsNumber(
    {},
    { message: 'El campo scholarshipAmount tiene que ser númerico.' },
  )
  @Min(0, {
    message:
      'El número de caracteres mínimo es 0 en el campo scholarshipAmount.',
  })
  readonly scholarshipAmount: number;

  @IsNumber({}, { message: 'El campo totalSubjects tiene que ser númerico.' })
  @Min(0, {
    message: 'El número de caracteres mínimo es 0 en el campo totalSubjects.',
  })
  readonly totalSubjects: number;

  @IsString({ message: 'technical debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres tecnica' })
  readonly technical: string;

  @IsString({ message: 'technology debe ser un texto' })
  @MaxLength(255, {
    message: 'Debe tener como Maximo 255 caracteres technology',
  })
  readonly technology: string;

  @IsNumber(
    {},
    { message: 'El campo totalPublications tiene que ser númerico.' },
  )
  @Min(0, {
    message:
      'El número de caracteres mínimo es 0 en el campo totalPublications.',
  })
  readonly totalPublications: number;
}
