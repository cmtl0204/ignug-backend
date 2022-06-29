
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  MinLength,
  IsDate,
  Min,
  Max,
  MaxLength,
  IsPositive,
  IsOptional,

} from 'class-validator';

export class CreateCurriculumDto {

  @IsNumber() //fk
  @IsPositive({message:' caracter es positivo'})
  readonly careerId:number;

   @IsNumber() //fk
  @IsPositive({message:'caracter es positivo'})
   readonly stateId:number;

  @IsString({message:' caracter tipo string'})
  @MinLength(2,{message:' minimo 2 cacacteres'})
  @MaxLength(20, {message:' minimo 20 cacacteres'})
  readonly code:string;
  @IsString()
  @MinLength(2,{message:' minimo 2 cacacteres'})
  @MaxLength(100,{message:' minimo 100 cacacteres'})
  readonly description:string;

 @IsDate({message:' caracter Date'})
 @Type()
 @IsOptional({message:' caracter opcional'})
 readonly endedAt:Date;

  @IsString({message:' caracter tipo string'})
  @MinLength(2,{message:' minimo de 2 cacacteres'})
  @MaxLength(255,{message:'maximo de 255 cacacteres'})
  readonly name:string;

  @IsString({message:' caracter tipo string'})
  @MinLength(1,{message:' minimo de 1 cacacteres'})
  @MaxLength(255,{message:' maximo 255 cacacteres'})
  readonly resolutionNumber:string;

  @IsDate({message:' caracter Date'})
  @Type()
  @IsOptional({message:' caracter srtartedAt'})
  readonly startedAt: Date;

  @IsNumber()
   @IsPositive(({message:' caracter es positivo'}))
  @Min(0,{message:' minimo de 0 cacacteres'})
   @Max(40,{message:' maximo de 40 cacacteres'})
  readonly periodicAcademicNumber:number;

  @IsNumber()
   @Min(0,{message:' minimo 0 cacacteres'})
   @Max(100,{message:' maximo de 100 cacacteres'})
   readonly weeksNumber:number;
}
