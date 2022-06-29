import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateInformationTeacherDto {

  @IsNumber({},{ message: 'El campo countryHigherEducationId tiene que ser númerico.' })
  @IsPositive({ message: 'El campo countryHigherEducationId tiene que ser positivo.' })
  readonly countryHigherEducationId: number;

  @IsNumber({},{ message: 'El campo dedicationTimeId tiene que ser númerico.' })
  @IsPositive({ message: 'El campo dedicationTimeId tiene que ser positivo.' })
  readonly dedicationTimeId: number;

  @IsNumber({}, { message: 'El campo financingTypeId tiene que ser númerico.' })
  @IsPositive({ message: 'El campo financingTypeId tiene que ser positivo.' })
  readonly financingTypeId: number;

  @IsNumber({},{ message: 'El campo higherEducationId tiene que ser númerico.' } )
  @IsPositive({ message: 'El campo higherEducationId tiene que ser positivo.' })
  readonly higherEducationId: number;

  @IsNumber({}, { message: 'El campo scholarshipId tiene que ser númerico.' })
  @IsPositive({ message: 'El campo scholarshipId tiene que ser positivo.' })
  readonly scholarshipId: number;

  @IsNumber({}, { message: 'El campo scholarshipTypeId tiene que ser númerico.' })
  @IsPositive({ message: 'El campo scholarshipTypeId tiene que ser positivo.' })
  readonly scholarshipTypeId: number;

  @IsNumber({}, { message: 'El campo teachingLadderId tiene que ser númerico.' })
  @IsPositive({ message: 'El campo teachingLadderId tiene que ser positivo.' })
  readonly teachingLadderId: number;

  @IsNumber({}, { message: 'El campo username tiene que ser númerico.' })
  @IsPositive({ message: 'El campo username tiene que ser positivo.' })
  readonly usernameId: number;

  @IsString({ message: 'academicUnit debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres academia' })
  readonly academicUnit: string;

  @IsNumber({},{ message: 'El campo administrativeHours tiene que ser númerico.' })
  @Min(0, {message: 'El campo administrativeHours número de caracteres mínimo es 0.'})
  readonly administrativeHours: number;

  @IsNumber({}, { message: 'El campo classHours tiene que ser númerico.' })
  @Min(0, { message: 'El campo classHours número de caracteres mínimo es 0.' })
  readonly classHours: number;

  @IsNumber({}, { message: 'El campo communityHours tiene que ser númerico.' })
  @Min(0, {message: 'El número de caracteres del campo communityHours  mínimo es 0.'})
  readonly communityHours: number;

  @IsString({ message: 'degreeHigherEducation debe ser un texto' })
  @MaxLength(255, {message: 'Debe tener como Maximo 255 caracteres degreeHigherEducation' })
  readonly degreeHigherEducation: string;

  @IsNumber({}, { message: 'El campo hoursWorked tiene que ser númerico.' })
  @Min(0, {message: 'El número de caracteres mínimo es 0 en el campo hoursWorked.' })
  readonly hoursWorked: number;

  @IsOptional({ message: 'El campo holidays es opcional.' })
  @IsDate({message: 'El campo holidays lleva las fechas de los dias festivos.' })
  readonly holidays: Date;

  @IsOptional({ message: 'El campo homeVacation es opcional.' })
  @IsDate({ message: 'El campo homeVacation es tipo fecha' })
  readonly homeVacation: Date;

  @IsNumber({},{ message: 'El campo investigationHours tiene que ser númerico.' } )
  @Min(0, {message: 'El número de caracteres mínimo es 0 en el campo investigationHours.' })
  readonly investigationHours: number;

  @IsString({ message: 'institutionHigherEducation debe ser un texto' })
  @MaxLength(255, {message: 'Debe tener como Maximo 255 caracteres institutionHigherEducation' })
  readonly institutionHigherEducation: string;

  @IsString({ message: 'otherHours debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres el campo otherHours' })
  readonly otherHours: string;

  @IsNumber({}, { message: 'El campo publications tiene que ser númerico.' })
  @Min(1, {message: 'El número de caracteres mínimo es 0 en el campo publications.' })
  readonly publications: number;

  @IsNumber({}, { message: 'El campo scholarshipAmount tiene que ser númerico.' })
  @Min(0, { message: 'El número de caracteres mínimo es 0 en el campo scholarshipAmount.' })
  readonly scholarshipAmount: number;

  @IsNumber({}, { message: 'El campo totalSubjects tiene que ser númerico.' })
  @Min(0, {message: 'El número de caracteres mínimo es 0 en el campo totalSubjects.' })
  readonly totalSubjects: number;

  @IsString({ message: 'technical debe ser un texto' })
  @MaxLength(255, { message: 'Debe tener como Maximo 255 caracteres tecnica' })
  readonly technical: string;

  @IsString({ message: 'technology debe ser un texto' })
  @MaxLength(255, {message: 'Debe tener como Maximo 255 caracteres technology' })
  readonly technology: string;

  @IsNumber({}, { message: 'El campo totalPublications tiene que ser númerico.' } )
  @Min(0, {message: 'El número de caracteres mínimo es 0 en el campo totalPublications.' })
  readonly totalPublications: number;
}
