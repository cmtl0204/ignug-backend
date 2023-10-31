import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollmentDto } from '@core/dto';
import {IsDate, IsOptional, IsString, Min} from "class-validator";

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
    @IsOptional()
    @IsDate({message: 'El campo date debe ser una fecha'})
    readonly date: Date;

    @IsOptional()
    @IsString({message: 'El campo folio debe ser un string'})
    readonly folio: string;
}
