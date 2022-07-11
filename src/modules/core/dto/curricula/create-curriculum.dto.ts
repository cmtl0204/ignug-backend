import {
  IsNumber,
  IsString,
  MinLength,
  IsDate,
  Min,
  Max,
  MaxLength,
  IsPositive,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { CareerEntity } from '../../entities/career.entity';

export class CreateCurriculumDto {
  @IsNotEmpty()
  readonly career: CareerEntity; //fk

  @IsNotEmpty()
  readonly state: CareerEntity; //fk

  @IsString({ message: ' caracter tipo string' })
  @MinLength(2, { message: ' minimo 2 cacacteres' })
  @MaxLength(20, { message: ' minimo 20 cacacteres' })
  readonly code: string;
  @IsString()
  @MinLength(2, { message: ' minimo 2 cacacteres' })
  @MaxLength(100, { message: ' minimo 100 cacacteres' })
  readonly description: string;

  @IsDate({ message: ' caracter Date' })
  @IsOptional({ message: ' caracter opcional' })
  readonly endedAt: Date;

  @IsString({ message: ' caracter tipo string' })
  @MinLength(2, { message: ' minimo de 2 cacacteres' })
  @MaxLength(255, { message: 'maximo de 255 cacacteres' })
  readonly name: string;

  @IsNumber({}, { message: 'es un number' })
  @IsPositive({ message: ' caracter es positivo' })
  @Min(0, { message: ' minimo de 0 cacacteres' })
  @Max(40, { message: ' maximo de 40 cacacteres' })
  readonly periodicAcademicNumber: number;

  @IsString({ message: ' caracter tipo string' })
  @MinLength(1, { message: ' minimo de 1 cacacteres' })
  @MaxLength(255, { message: ' maximo 255 cacacteres' })
  readonly resolutionNumber: string;

  @IsDate({ message: ' caracter Date' })
  @IsOptional({ message: ' caracter srtartedAt' })
  readonly startedAt: Date;

  @IsNumber({}, { message: 'es un number' })
  @Min(0, { message: ' minimo 0 cacacteres' })
  @Max(100, { message: ' maximo de 100 cacacteres' })
  readonly weeksNumber: number;
}
