import { IsDate, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";
import { EnrollmentEntity, CatalogueEntity, SubjectEntity  } from "@core/entities";

export class EnrollmentsDetailDto{
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

    @IsNumber({}, { message: 'El campo number debe ser un número' })
    @Min(0, { message: 'El campo number debe tener mínimo 0' })
    readonly number: number;

    @IsDate({ message: 'El campo date debe ser una fecha' })
    @MinLength(5, { message: 'El campo date debe tener una fecha valida' })
    readonly date: Date;

    @IsNumber({}, { message: 'El campo finalAttendance debe ser un número' })
    @Min(0, { message: 'El campo finalAttendance debe tener mínimo 0' })
    readonly finalAttendance: number;

    @IsNumber({}, { message: 'El campo finalAttendance debe ser un número' })
    @Min(0, { message: 'El campo finalAttendance debe tener mínimo 0' })
    readonly finalGrade: number;

    @IsString({ message: 'El campo observation debe ser un string' })
    @Min(0, { message: 'El campo observation debe tener minimo 5 caracteres' })
    readonly observation: string;
}