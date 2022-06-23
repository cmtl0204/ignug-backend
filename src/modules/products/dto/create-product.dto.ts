import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Debe ser un string' })
  @MinLength(3, { message: 'El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly name: string;

  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsBoolean()
  readonly free: boolean;

  @IsOptional()
  @IsString()
  readonly longDescription: string;

  @IsOptional()
  @IsDateString()
  readonly registeredAt: Date;
}
