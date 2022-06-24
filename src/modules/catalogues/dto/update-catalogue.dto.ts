import { PartialType } from '@nestjs/swagger';
import { CreateCatalogueDto } from './create-catalogue.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCatalogueDto extends PartialType(CreateCatalogueDto) {
  @IsString({ message: 'Debe ser un string' })
  @MinLength(3, { message: 'El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly name: string;
}
