import {
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(5)
  readonly name: string;

  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsBoolean()
  readonly free: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
