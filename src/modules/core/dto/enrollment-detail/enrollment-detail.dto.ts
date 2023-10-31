import {IsNotEmpty, IsNumber, IsString, Min} from "class-validator";
import {EnrollmentEntity, CatalogueEntity, SubjectEntity} from "@core/entities";

export class EnrollmentsDetailDto {
    @IsNotEmpty()
    readonly academicState: CatalogueEntity;

    @IsNotEmpty()
    readonly enrollment: EnrollmentEntity;

    @IsNotEmpty()
    readonly parallel: CatalogueEntity;

    @IsNotEmpty()
    readonly subject: SubjectEntity;

    @IsNotEmpty()
    readonly type: CatalogueEntity;

    @IsNotEmpty()
    readonly workday: CatalogueEntity;

    @IsNumber({}, {message: 'El campo number debe ser un número'})
    @Min(0, {message: 'El campo number debe tener mínimo 0'})
    readonly number: number;

    @IsString({message: 'El campo observation debe ser un string'})
    @Min(0, {message: 'El campo observation debe tener minimo 5 caracteres'})
    readonly observation: string;
}