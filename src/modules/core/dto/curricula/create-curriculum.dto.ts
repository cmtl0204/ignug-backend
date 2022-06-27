
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
   @type()
  @IsOptional()
  readonly startedAt: Date;

 @IsDate()
 @Type()
 @IsOptional()
  readonly endedAt:Date;

  @IsString()
  @MinLength(2,{message:' minimo 2 cacacteres'})
  @MaxLength(255,{message:' maximo 255 cacacteres'})
  readonly name:string;

  @IsString()
  @MinLength(2,{message:' minimo 2 cacacteres'})
  @MaxLength(100,{message:' maximo 100 cacacteres'})
  readonly description:string;

   @IsNumber()
   @Min(0)
   @Max(100)
   readonly weeksNumber:number;

  @IsString()
  @MinLength(1,{message:' minimo 1 cacacteres'})
  @MaxLength(255,{message:' minimo255 cacacteres'})
  readonly resolutionNumber:string;

  @IsNumber()
   @IsPositive()
  @Min(0)
   @Max(40)
  readonly periodicAcademicNumber:number;
}
