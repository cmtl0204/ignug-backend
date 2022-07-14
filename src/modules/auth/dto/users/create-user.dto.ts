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
  @IsPositive({ message: 'El campo ethnicOrigin debe ser positivo' })
  readonly ethnicOrigin: CatalogueEntity;

  @IsOptional()
  @IsPositive({ message: 'El campo identificationType debe ser positivo' })
  readonly identificationType: CatalogueEntity;

  @IsOptional()
  @IsPositive({ message: 'El campo gender debe ser positivo' })
  readonly gender: CatalogueEntity;

  @IsOptional()
  @IsPositive({ message: 'El campo maritalStatus debe ser positivo' })
  readonly maritalStatus: CatalogueEntity;

  @IsOptional()
  @IsPositive({ message: 'El campo sex debe ser positivo' })
  readonly sex: CatalogueEntity;

  @IsOptional()
  @IsDate({ message: 'El campo birthdate debe ser una fecha válida' })
  readonly birthdate: Date;

  @IsNotEmpty({ message: 'El campo email es obligatorio' })
  @IsEmail({ message: 'El campo email debe ser un correo electrónico' })
  readonly email: string;

  @IsNotEmpty({ message: 'El campo lastname es obligatorio' })
  @IsString({ message: 'El campo lastname debe ser un string' })
  readonly lastname: string;

  @IsNotEmpty({ message: 'El campo password es obligatorio' })
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
