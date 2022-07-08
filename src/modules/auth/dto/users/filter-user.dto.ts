import { PaginationDto } from '@core/dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class FilterUserDto extends PaginationDto {
  @IsOptional()
  @IsDate()
  readonly birthdate: Date;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly lastname: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly username: string;
}
