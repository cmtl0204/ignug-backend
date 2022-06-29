import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  Min,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateCareerDto {
  @IsNumber({}, {message: 'El campo institutionId debe ser un numero'})
  @IsPositive({message: 'El campo institutionId debe ser un numero positivo'})
  readonly institutionId: number;

  @IsNumber({},{message: 'El campo modalityId debe ser un numero'})
  @IsPositive({message: 'El campo modalityId debe ser un numero positivo'})
  readonly modalityId: number;

  @IsNumber({}, {message: 'El campo stateId debe ser un numero'})
  @IsPositive({message: 'El campo stateId debe ser un numero positivo'})
  readonly stateId: number;

  @IsNumber({},{message: 'El campo typeId debe ser un numero'})
  @IsPositive({message: 'El campo typeId debe ser un numero positivo'})
  readonly typeId: number;

  @IsString({message: 'El campo acronym debe ser un string'})
  @MinLength(2, { message: 'El acronimo debe tener al menos 2 caracteres' })
  @MaxLength(10, { message: 'El acronimo no puede tener más de 10 caracteres' })
  readonly acronym: string;

  @IsString({message: 'El campo code debe ser un string'})
  @MinLength(1, { message: 'El codigo debe tener al menos 1 caracter' })
  @MaxLength(50, { message: 'El codigo no puede tener más de 50 caracteres' })
  readonly code: string;

  @IsString({message: 'El campo codeSniese debe ser un string'})
  @MinLength(1, { message: 'El codigo debe tener al menos 1 caracter' })
  @MaxLength(50, { message: 'El codigo no puede tener más de 50 caracteres' })
  readonly codeSniese: string;

  @IsString({message: 'El campo logo debe ser un string'})
  @IsOptional()
  readonly logo: string;

  @IsString({message: 'El campo name debe ser un string'})
  @MinLength(1, { message: 'El nombre debe tener al menos 1 caracter' })
  @MaxLength(255, { message: 'El nombre no puede tener más de 255 caracteres' })
  readonly name: string;

  @IsNumber({}, {message: 'El campo resolutionNumber debe ser un numero'})
  @Min(0, { message: 'El numero de resolucion debe ser mayor o igual a 0' })
  readonly resolutionNumber: number;

  @IsString({message: 'El campo shortName debe ser un string'})
  @MinLength(1, { message: 'El nombre corto debe tener al menos 1 caracter' })
  @MaxLength(255, {
    message: 'El nombre corto no puede tener más de 255 caracteres',
  })
  readonly shortName: string;

  @IsString({message: 'El campo title debe ser un string'})
  @MinLength(1, { message: 'El titulo debe tener al menos 1 caracter' })
  @MaxLength(255, { message: 'El titulo no puede tener más de 255 caracteres' })
  readonly title: string;
}
