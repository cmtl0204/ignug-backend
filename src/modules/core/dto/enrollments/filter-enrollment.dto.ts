import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterEnrollmentDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  readonly code: string;

  @IsOptional()
  @IsDate()
  readonly date: Date;

  @IsOptional()
  @IsDate()
  readonly application_at: Date;
}
