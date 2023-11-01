import {IsNotEmpty, IsOptional, IsString, IsDate, Min, MinLength} from 'class-validator';
import {StudentEntity, CatalogueEntity, SchoolPeriodEntity, CareerEntity, EnrollmentDetailEntity} from '@core/entities';
import {CreateEnrollmentsDetailDto} from "../enrollment-details/create-enrollment-detail.dto";

export class EnrollmentDto {
    @IsNotEmpty()
    readonly student: StudentEntity;

    @IsNotEmpty()
    readonly academicPeriod: CatalogueEntity;

    @IsNotEmpty()
    readonly career: CareerEntity;

    @IsNotEmpty()
    readonly enrollmentDetails: CreateEnrollmentsDetailDto[];

    @IsNotEmpty()
    readonly parallel: CatalogueEntity;

    @IsNotEmpty()
    readonly schoolPeriod: SchoolPeriodEntity;

    @IsNotEmpty()
    readonly type: CatalogueEntity;

    @IsNotEmpty()
    readonly workday: CatalogueEntity;

    @IsString({message: 'El campo code debe ser un String'})
    @Min(0, {message: 'El campo code debe tener minimo 5 caracteres'})
    readonly code: string;

    @IsString({message: 'El campo observation debe ser un String'})
    @Min(0, {message: 'El campo observation debe tener minimo 5 caracteres'})
    readonly observation: string;
}
