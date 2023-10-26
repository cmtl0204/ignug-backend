import {IsNotEmpty, IsOptional} from "class-validator";

export class EnrollmentStateDto {
    @IsNotEmpty()
    readonly enrollmentId: string;

    @IsNotEmpty()
    readonly stateId: string;

    @IsOptional()
    readonly observation: string;
}