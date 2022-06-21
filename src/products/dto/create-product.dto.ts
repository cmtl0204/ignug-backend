import {
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

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
