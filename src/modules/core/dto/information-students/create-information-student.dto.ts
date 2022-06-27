import {
  IsNumber,
  IsString,
  MaxLength,
  Min,
  Max, 
  } from 'class-validator';

export class CreateInformationStudentDto{ 

  //@IsString()
  //@MinLength(5)
  //@MaxLength(10)
  //@IsPositive()
  //readonly revenueDestination: string; //pendiente fk

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(1000,{ message: 'Maximo 1000 caracteres' })
  readonly address :string;
 
  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0,{ message: 'El número de digitos mínimo es 0.' })
  readonly community: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0,{ message: 'El número de digito mínimo es 0.' })
  @Max(100,{ message: 'Maximo 100 digito' })
  readonly disabilityPercentage: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0,{ message: 'El número de digito mínimo es 0.' })
  readonly economicAmount: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0,{ message: 'El número de digito mínimo es 0.' })
  readonly educationalAmount: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  readonly familyIncome: number;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(1, { message: 'Maximo 1 caracter' })
  readonly isLostGratuity : string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(1, { message: 'Maximo 1 caracter' })
  readonly isExecutedPractice: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(1, { message: 'Maximo 1 caracter' })
  readonly isExecutedCommunity : string;
  
  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(1,{ message: 'El número de digitos mínimo es 1.' })
  @Max(20, { message: 'Maximo 20 digitos' })
  readonly membersHouseNumber: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0,{ message: 'El número de digito mínimo es 0.' })
  readonly practiceHours: number;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(100, { message: 'Maximo 100 caracteres' })
  readonly postalCode: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  readonly scholarshipAmount: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0,{ message: 'El número de digito mínimo es 0.' })
  @Max(100,{ message: 'Maximo 100 digito' })
  readonly tariffScholarshipPercentage: number;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly contactEmergencyName: string;
 
  @IsString({ message: 'Debe ser un string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly contactEmergencyKinship: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly contactEmergencyPhone: string;

}