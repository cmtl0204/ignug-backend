import {
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
  IsEmpty,
  IsOptional,
  Allow,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly lastname: string;
  @IsString()
  readonly birthdate: Date;
  @IsOptional()
  readonly age: number;
  @IsBoolean()
  readonly married: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
