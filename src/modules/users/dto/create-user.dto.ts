import {
  IsString,
  IsBoolean,
  IsPositive,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly lastname: string;

  @IsOptional()
  @IsDateString()
  readonly birthdate: Date;

  @IsPositive()
  readonly age: number;

  @IsBoolean()
  readonly married: boolean;
}
