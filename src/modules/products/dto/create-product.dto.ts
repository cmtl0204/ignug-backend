import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
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

  @IsOptional()
  @IsString()
  readonly longDescription: string;

  // @IsOptional()
  // @IsDate()
  // readonly registeredAt: Date;
}
