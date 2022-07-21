import { IsString, MinLength } from 'class-validator-multi-lang';
import { CatalogueStateEnum, CatalogueTypeEnum } from '@shared/enums';
import {
  messageIsNotEmpty,
  messageIsString,
  messageMinLength,
} from '@shared/validation';
import { IsNotEmpty } from 'class-validator';

export class CatalogueDto {
  @IsNotEmpty(messageIsNotEmpty())
  @IsString(messageIsString())
  readonly code: string;

  @IsString(messageIsString())
  @MinLength(5, messageMinLength())
  readonly description: string;

  @IsString(messageIsString())
  readonly name: string;

  @IsString(messageIsString())
  readonly state: CatalogueStateEnum;

  @IsString(messageIsString())
  readonly type: CatalogueTypeEnum;
}
