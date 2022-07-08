import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  Min,
  IsPositive,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateCareerDto {
  @IsNotEmpty({message: 'El nombre es requerido'})
  readonly institution: number;

  @IsOptional({message: 'La modalidad es opcional'})
  readonly modality: number;

  @IsOptional({message: 'El estado es opcional'})
  readonly state: number;

  @IsOptional({message: 'El tipo es opcional'})
  readonly type: number;

  @IsString({ message: 'El campo acronym debe ser un string' })
  @MinLength(2, { message: 'El acronimo debe tener al menos 2 caracteres' })
  @MaxLength(10, { message: 'El acronimo no puede tener más de 10 caracteres' })
  readonly acronym: string;

  @IsString({ message: 'El campo code debe ser un string' })
  @MinLength(1, { message: 'El codigo debe tener al menos 1 caracter' })
  @MaxLength(50, { message: 'El codigo no puede tener más de 50 caracteres' })
  readonly code: string;

  @IsString({ message: 'El campo codeSniese debe ser un string' })
  @MinLength(1, { message: 'El codigo debe tener al menos 1 caracter' })
  @MaxLength(50, { message: 'El codigo no puede tener más de 50 caracteres' })
  readonly codeSniese: string;

  @IsString({ message: 'El campo logo debe ser un string' })
  @IsOptional()
  readonly logo: string;

  @IsString({ message: 'El campo name debe ser un string' })
  @MinLength(1, { message: 'El nombre debe tener al menos 1 caracter' })
  @MaxLength(255, { message: 'El nombre no puede tener más de 255 caracteres' })
  readonly name: string;

  @IsNumber({}, { message: 'El campo resolutionNumber debe ser un numero' })
  @Min(0, { message: 'El numero de resolucion debe ser mayor o igual a 0' })
  readonly resolutionNumber: number;

  @IsString({ message: 'El campo shortName debe ser un string' })
  @MinLength(1, { message: 'El nombre corto debe tener al menos 1 caracter' })
  @MaxLength(255, {
    message: 'El nombre corto no puede tener más de 255 caracteres',
  })
  readonly shortName: string;

  @IsString({ message: 'El campo title debe ser un string' })
  @MinLength(1, { message: 'El titulo debe tener al menos 1 caracter' })
  @MaxLength(255, { message: 'El titulo no puede tener más de 255 caracteres' })
  readonly title: string;
}
