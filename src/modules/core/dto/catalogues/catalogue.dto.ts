import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CatalogueStateEnum, CatalogueTypeEnum } from '@shared/enums';
import {
  messageIsEnum,
  messageIsNotEmpty,
  messageIsString,
  messageMinLength,
} from '@shared/validation';

export class CatalogueDto {
  @IsNotEmpty(messageIsNotEmpty())
  @IsString(messageIsString())
  readonly code: string;

  @IsString(messageIsString())
  @MinLength(5, messageMinLength())
  readonly description: string;

  @IsString(messageIsString())
  readonly name: string;

  @IsEnum(CatalogueStateEnum, messageIsEnum())
  readonly state: CatalogueStateEnum;

  @IsString(messageIsString())
  readonly type: CatalogueTypeEnum;
}
