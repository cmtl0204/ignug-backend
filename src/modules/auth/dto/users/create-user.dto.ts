import {
  IsString,
  IsBoolean,
  IsPositive,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsDate,
  IsArray,
} from 'class-validator';
import { CatalogueEntity } from '@core/entities';

export class CreateUserDto {
  @IsOptional()
  readonly bloodType: CatalogueEntity;

  @IsOptional()
  @IsPositive()
  readonly ethnicOrigin: CatalogueEntity;

  @IsOptional()
  @IsPositive()
  readonly identificationType: CatalogueEntity;

  @IsOptional()
  @IsPositive()
  readonly gender: CatalogueEntity;

  @IsOptional()
  @IsPositive()
  readonly maritalStatus: CatalogueEntity;

  @IsOptional()
  @IsPositive()
  readonly sex: CatalogueEntity;

  @IsOptional()
  @IsDate()
  readonly birthdate: Date;

  @IsNotEmpty()
  @IsEmail({ message: 'debe ser un correo electrónico' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsBoolean()
  readonly passwordChanged: boolean;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  readonly roles: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly username: string;
}
