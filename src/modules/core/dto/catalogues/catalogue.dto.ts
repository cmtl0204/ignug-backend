import { IsOptional, IsString, MinLength } from 'class-validator';
import { CatalogueStateEnum, CatalogueTypeEnum } from '@shared/enums';

export class CatalogueDto {
  @IsOptional()
  readonly id: number;

  @IsString()
  readonly code: string;

  @IsString()
  @MinLength(5, { message: '$property' })
  readonly description: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly state: CatalogueStateEnum;

  @IsString()
  readonly type: CatalogueTypeEnum;
}
