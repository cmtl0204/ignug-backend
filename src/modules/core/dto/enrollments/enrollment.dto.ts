import { IsNumber, IsNotEmpty, IsOptional, IsString, IsDate, Max, Min, MaxLength, MinLength } from 'class-validator';
import { StudentEntity, CatalogueEntity, CurriculumEntity, SchoolPeriodEntity } from '@core/entities';

export class EnrollmentDto {
  @IsNotEmpty()
  readonly student: StudentEntity;

  @IsNotEmpty()
  readonly academicPeriod: CatalogueEntity;

  @IsNotEmpty()
  readonly curriculum: CurriculumEntity;

  @IsNotEmpty()
  readonly parallel: CatalogueEntity;

  @IsNotEmpty()
  readonly schoolPeriodEntity: SchoolPeriodEntity;

  @IsNotEmpty()
  readonly state: CatalogueEntity;

  @IsNotEmpty()
  readonly type: CatalogueEntity;

  @IsNotEmpty()
  readonly workday: CatalogueEntity;


  @IsString({ message: 'El campo code debe ser un String' })
  @Min(0, { message: 'El campo code debe tener minimo 5 caracteres' })
  readonly code: string;

  @IsDate({ message: 'El campo date debe ser una fecha' })
  @MinLength(5, { message: 'El campo date debe tener una fecha valida' })
  readonly date: Date;

  @IsDate({ message: 'El campo application_at debe ser una fecha' })
  @MinLength(5, { message: 'El campo application_at debe tener una fecha valida' })
  readonly application_at: Date;

  @IsOptional()
  @IsString({ message: 'El campo folio debe ser un string' })
  @Min(0, { message: 'El campo credit debe tener minimo 5 caracteres' })
  readonly folio: string;

  @IsString({ message: 'El campo observation debe ser un String' })
  @Min(0, { message: 'El campo observation debe tener minimo 5 caracteres' })
  readonly observation: string;
}
