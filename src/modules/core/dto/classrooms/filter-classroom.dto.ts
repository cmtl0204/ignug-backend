import { IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterClassroomDto extends PaginationDto {
  @IsNumber()
  readonly value: number;
}
