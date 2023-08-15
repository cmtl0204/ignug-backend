import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterGradeDto extends PaginationDto {
  @IsOptional()
  @IsDate()
  readonly created_at: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;

  @IsOptional()
  @IsDate()
  readonly deletedAt: Date;

  @IsOptional()
  @IsNumber()
  readonly value: number;
}

