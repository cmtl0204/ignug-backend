import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { CatalogueEntity } from '@core/entities';
import { UserEntity } from '@auth/entities';
import { ReadUserDto } from '@auth/dto';

export class CreateTeacherDto {
  @IsString({ message: 'El campo debe ser de tipo string' })
  name: string;

  @IsOptional()
  readonly user: ReadUserDto;
}
