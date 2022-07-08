import {
  IsString,
  IsBoolean,
  IsPositive,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsDate,
} from 'class-validator';
import { CatalogueEntity } from '@core/entities';

export class CreateUserDto {
  @IsOptional()
  readonly bloodType: CatalogueEntity;

  @IsOptional()
  @IsPositive()
  readonly ethnicOriginId: number;

  @IsOptional()
  @IsPositive()
  readonly identificationTypeId: number;

  @IsOptional()
  @IsPositive()
  readonly genderId: number;

  @IsOptional()
  @IsPositive()
  readonly maritalStatusId: number;

  @IsOptional()
  @IsPositive()
  readonly sexId: number;

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
  @IsString()
  @MinLength(5)
  readonly username: string;

  messageProperty(message: string): string {
    return `La propiedad $property ${message}`;
  }
}
