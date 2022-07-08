import {
  IsNumber,
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { CatalogueEntity } from '@core/entities';


export class CreateInformationStudentDto {
  
  @IsNotEmpty()
  readonly isAncestralLanguage: CatalogueEntity;

  @IsNotEmpty()
  readonly isBonusDevelopmentReceive: CatalogueEntity;

  
  @IsNotEmpty()
  readonly isDisability: CatalogueEntity;

  @IsNotEmpty()
  readonly isDegreeSuperior: CatalogueEntity;

  @IsNotEmpty()
  readonly isSubjectRepeat: CatalogueEntity;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(1000, { message: 'Maximo 1000 caracteres' })
  readonly address: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly ancestralLanguage: string;

  @IsString({ message: 'Se acepta solo numero' })
  @MaxLength(100, { message: 'Maximo 100 caracteres' })
  readonly cellPhone: string;

  @IsString({ message: 'Se acepta solo string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly companyName: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digitos mínimo es 0.' })
  readonly community: number;

  @IsString({ message: 'Se acepta solo string' })
  @MaxLength(10, { message: 'Maximo 10 caracteres' })
  readonly conadisNumber: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly contactEmergencyName: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly contactEmergencyKinship: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly contactEmergencyPhone: string;

  @IsString({ message: 'Se acepta solo string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly degreeObtainedSuperior: string;

  @IsString({ message: 'se acepta solo string ' })
  @MaxLength(100, { message: 'maximo de 100 caracteres' })
  readonly differentiatedPension: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digito mínimo es 0.' })
  @Max(100, { message: 'Maximo 100 digito' })
  readonly disabilityPercentage: number;

  @IsString({ message: 'Se acepta solo string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly disabilityType: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digito mínimo es 0.' })
  readonly educationalAmount: number;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(2, { message: 'educationLevelMother Maximo 2 caracteres' })
  readonly educationLevelMother: string;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(2, { message: 'Maximo 2 caracteres' })
  readonly educationLevelFather: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digito mínimo es 0.' })
  readonly economicAmount: number;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(2, { message: 'Maximo 2 caracteres' })
  readonly economicPracticeSector: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  readonly familyIncome: number;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(100, { message: 'Maximo 2 caracteres' })
  readonly financingScholarshipType: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(1, { message: 'Maximo 1 caracter' })
  readonly isExecutedPractice: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(1, { message: 'Maximo 1 caracter' })
  readonly isExecutedCommunity: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(1, { message: 'Maximo 1 caracter' })
  readonly isLostGratuity: string;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly institutionPracticeType: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(1, { message: 'El número de digitos mínimo es 1.' })
  @Max(20, { message: 'Maximo 20 digitos' })
  readonly membersHouseNumber: number;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly ocupation: string;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(100, { message: 'Maximo 100 caracteres' })
  readonly phone: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(100, { message: 'Maximo 100 caracteres' })
  readonly postalCode: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digito mínimo es 0.' })
  readonly practiceHours: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  readonly scholarshipAmount: number;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly scholarshipReason1: string;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly scholarshipReason2: string;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly scholarshipReason3: string;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly scholarshipReason4: string;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly scholarshipReason5: string;

  @IsString({ message: 'Se acepta string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly scholarshipReason6: string;

  @IsString({ message: 'Se acepta solo string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly scholarshipType: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digito mínimo es 0.' })
  @Max(100, { message: 'Maximo 100 digito' })
  readonly tariffScholarshipPercentage: number;
}
