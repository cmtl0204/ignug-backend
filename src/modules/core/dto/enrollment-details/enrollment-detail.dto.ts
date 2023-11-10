import {IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";
import {EnrollmentEntity, CatalogueEntity, SubjectEntity} from "@core/entities";
import {
    isStringValidationOptions,
    maxValidationOptions,
    minValidationOptions
} from "@shared/validation";

export class EnrollmentsDetailDto {
    @IsOptional()
    readonly academicState: CatalogueEntity;

    @IsNotEmpty()
    readonly enrollmentId: string;

    @IsNotEmpty()
    readonly parallel: CatalogueEntity;

    @IsNotEmpty()
    readonly subjectId: string;

    @IsNotEmpty()
    readonly type: CatalogueEntity;

    @IsNotEmpty()
    readonly workday: CatalogueEntity;

    @IsNumber({}, {message: 'El campo number debe ser un número'})
    @Min(1, minValidationOptions())
    @Max(3, maxValidationOptions())
    readonly number: number;

    @IsString(isStringValidationOptions())
    readonly observation: string;
}
