import {
  IsString,
  IsBoolean,
  IsPositive,
  IsDateString,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsPositive()
  readonly bloodTypeId: number;

  @IsOptional()
  @IsPositive()
  readonly ethnicOriginId: number;

  @IsOptional()
  @IsPositive()
  readonly identificationTypeId: number;

  @IsOptional()
  @IsPositive()
  readonly genderId: number;

  @IsOptional()
  @IsPositive()
  readonly maritalStatusId: number;

  @IsOptional()
  @IsPositive()
  readonly sexId: number;

  @IsOptional()
  @IsDateString()
  readonly birthdate: Date;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsBoolean()
  readonly passwordChanged: boolean;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly username: string;
}
