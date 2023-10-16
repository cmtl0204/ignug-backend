import {IsNotEmpty, IsOptional, IsString, IsDate, Min, MinLength} from 'class-validator';
import {StudentEntity, CatalogueEntity, SchoolPeriodEntity, CareerEntity} from '@core/entities';

export class EnrollmentDto {
    @IsNotEmpty()
    readonly student: StudentEntity;

    @IsNotEmpty()
    readonly academicPeriod: CatalogueEntity;

    @IsNotEmpty()
    readonly career: CareerEntity;

    @IsNotEmpty()
    readonly parallel: CatalogueEntity;

    @IsNotEmpty()
    readonly schoolPeriod: SchoolPeriodEntity;

    @IsNotEmpty()
    readonly state: CatalogueEntity;

    @IsNotEmpty()
    readonly type: CatalogueEntity;

    @IsNotEmpty()
    readonly workday: CatalogueEntity;

    @IsString({message: 'El campo code debe ser un String'})
    @Min(0, {message: 'El campo code debe tener minimo 5 caracteres'})
    readonly code: string;

    @IsDate({message: 'El campo date debe ser una fecha'})
    @MinLength(5, {message: 'El campo date debe tener una fecha valida'})
    readonly date: Date;

    @IsDate({message: 'El campo application_at debe ser una fecha'})
    @MinLength(5, {message: 'El campo application_at debe tener una fecha valida'})
    readonly applicationsAt: Date;

    @IsOptional()
    @IsString({message: 'El campo folio debe ser un string'})
    @Min(0, {message: 'El campo credit debe tener minimo 5 caracteres'})
    readonly folio: string;

    @IsString({message: 'El campo observation debe ser un String'})
    @Min(0, {message: 'El campo observation debe tener minimo 5 caracteres'})
    readonly observation: string;
}
