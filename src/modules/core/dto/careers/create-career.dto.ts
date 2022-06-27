import { 
    IsString, 
    MaxLength, 
    MinLength, 
    IsNumber, 
    Min, 
    IsPositive, 
    IsOptional 
} 
    from 'class-validator';

export class CreateCareerDto {
    @IsNumber()
    @IsPositive()
    readonly institutionId: number;

    @IsNumber()
    @IsPositive()
    readonly state: number;
    
    @IsNumber()
    @IsPositive()
    readonly type: number;

    @IsString()
    @MinLength(2, { message: 'El acronimo debe tener al menos 2 caracteres' })
    @MaxLength(10, { message: 'El acronimo no puede tener más de 10 caracteres' })
    readonly acronym: string;

    @IsString()
    @MinLength(1, { message: 'El codigo debe tener al menos 1 caracter' })
    @MaxLength(50, { message: 'El codigo no puede tener más de 50 caracteres' })
    readonly code: string;

    
    @IsString()
    @MinLength(1, { message: 'El codigo debe tener al menos 1 caracter' })
    @MaxLength(50, { message: 'El codigo no puede tener más de 50 caracteres' })
    readonly codeSniese: string;

    @IsString()
    @IsOptional()
    readonly logo: string;

    @IsString()
    @MinLength(1, { message: 'La modalidad debe tener al menos 1 caracter' })
    @MaxLength(100, { message: 'La modalidad no puede tener más de 100 caracteres' })
    readonly modality: string;

    @IsString()
    @MinLength(1, { message: 'El nombre debe tener al menos 1 caracter' })
    @MaxLength(255, { message: 'El nombre no puede tener más de 255 caracteres' })
    readonly name: string;

    @IsNumber()
    @Min(0, { message: 'El numero de resolucion debe ser mayor o igual a 0' })
    readonly resolutionNumber: number;

    @IsString()
    @MinLength(1, { message: 'El nombre corto debe tener al menos 1 caracter' })
    @MaxLength(255, { message: 'El nombre corto no puede tener más de 255 caracteres' })
    readonly shortName: string;

    @IsString()
    @MinLength(1, { message: 'El titulo debe tener al menos 1 caracter' })
    @MaxLength(255, { message: 'El titulo no puede tener más de 255 caracteres' })
    readonly title: string;
}