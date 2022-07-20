import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CatalogueStateEnum, CatalogueTypeEnum } from '@shared/enums';

export class CatalogueDto {
  @IsOptional()
  readonly id: number;

  @IsString()
  readonly code: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly state: CatalogueStateEnum;

  @IsString()
  readonly type: CatalogueTypeEnum;
}
