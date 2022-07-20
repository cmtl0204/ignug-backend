import { IsString, MaxLength, MinLength } from 'class-validator';

export class CatalogueDto {
  @IsString({ (value)=> value  })
  readonly name: string;
}
