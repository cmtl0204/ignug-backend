import { InstitutionEntity, CatalogueEntity } from '@core/entities';
import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import {
  messageIsNotEmpty,
  messageIsString,
  messageMaxLength,
  messageMinLength,
} from '@shared/validation';

export class CareerDto {
  @IsNotEmpty(messageIsNotEmpty())
  readonly institution: InstitutionEntity;

  @IsNotEmpty(messageIsNotEmpty())
  readonly modality: CatalogueEntity;

  @IsNotEmpty(messageIsNotEmpty())
  readonly state: CatalogueEntity;

  @IsOptional()
  readonly type: CatalogueEntity;

  @IsString(messageIsString())
  @MinLength(3, messageMinLength())
  @MaxLength(10, messageMaxLength())
  readonly acronym: string;

  @IsString(messageIsString())
  @MinLength(3, messageMinLength())
  @MaxLength(20, messageMaxLength())
  readonly code: string;

  @IsString(messageIsString())
  readonly codeSniese: string;

  @IsString(messageIsString())
  readonly degree: string;

  @IsOptional()
  @IsString(messageIsString())
  readonly logo: string;

  @IsString(messageIsString())
  readonly name: string;

  @IsString(messageIsString())
  readonly resolutionNumber: string;

  @IsString(messageIsString())
  readonly shortName: string;
}
