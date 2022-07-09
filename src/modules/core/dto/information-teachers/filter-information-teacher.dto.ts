import { PaginationDto } from '@core/dto';
import { IsDate, IsOptional, IsString,IsNumber } from 'class-validator';

export class FilterInformationTeacherDto extends PaginationDto {

  @IsOptional()
  @IsString()
  readonly academicUnit: string;

  @IsOptional()
  @IsString()
  readonly degreeHigherEducation: string;

  @IsOptional()
  @IsString()
  readonly institutionHigherEducation: string;

  @IsOptional()
  @IsString()
  readonly otherHours: string;

  @IsOptional()
  @IsString()
  readonly technical: string;


  @IsOptional()
  @IsString()
   readonly technology: string;

}
