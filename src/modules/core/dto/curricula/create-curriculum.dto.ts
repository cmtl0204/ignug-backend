
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
  IsAlphanumeric,
  IsEthereumAddress,
} from 'class-validator';
import { isExpression } from 'joi';
import { IsNull } from 'typeorm';

export class CreateCurriculumDto {

  @IsNumber() //fk
  @IsPositive()
  readonly careerId:number;

   @IsNumber() //fk
  @IsPositive()
   readonly stateId:number;
  @IsString()
  @MinLength(2,{message:' minimo 2 cacacteres'})
  @MaxLength(20, {message:' minimo 20 cacacteres'})
  readonly code:string;

  @IsDate()
   @Type()
  @IsOptional()
  readonly startedAt: Date;

 @IsDate()
 @Type()
 @IsOptional()
  readonly endedAt:Date;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly name:string;

  @IsString()
  @MinLength(2,{message:' minimo 2 cacacteres'})
  @MaxLength(100,{message:' minimo 100 cacacteres'})
  readonly description:string;

   @IsNumber()
   @Min(0)
   @Max(100)
   readonly weeksNumber:number;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly resolutionNumber:string;

  @IsNumber()
   @IsPositive()
  @Min(0)
   @Max(40)
  readonly periodicAcademicNumber:number;
}
