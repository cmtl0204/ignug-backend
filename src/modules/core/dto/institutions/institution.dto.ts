import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CatalogueEntity } from '@core/entities';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';

export class InstitutionDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: CatalogueEntity;

  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  readonly acronym: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly cellphone: string;

  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  readonly code: string;

  @IsString({ message: 'codeSniese debe ser texto' })
  readonly codeSniese: string;

  @IsString({ message: 'denomination debe ser texto' })
  readonly denomination: string;

  @IsOptional()
  @IsEmail({}, { message: 'email debe ser un email' })
  readonly email: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly isVisible: boolean;

  @IsOptional()
  @IsString({ message: 'logo debe ser texto' })
  readonly logo: string;

  @IsString({ message: 'name debe ser texto' })
  readonly name: string;

  @IsOptional({ message: 'phone es opcional' })
  @IsString({ message: 'phone debe ser texto' })
  readonly phone: string;

  @IsString({ message: 'shortName debe ser texto' })
  readonly shortName: string;

  @IsOptional({ message: 'slogan es opcional' })
  @IsString({ message: 'slogan debe ser texto' })
  readonly slogan: string;

  @IsOptional({ message: 'web es opcional' })
  @IsString({ message: 'web debe ser texto' })
  @IsUrl({}, { message: 'web debe ser una url válida' })
  readonly web: string;
}
