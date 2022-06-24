import {
  IS_NOT_EMPTY,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'El campo name debe ser un string' })
  @MinLength(3, { message: 'El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly name: string;

  @IsNumber({}, { message: 'asd' })
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

  @IsPositive()
  @IsOptional()
  userId: number;

  @IsPositive({ message: 'EL campo typeId debe ser positivo' })
  typeId: number;

  @IsPositive()
  @IsOptional()
  categoryId: number;
}
