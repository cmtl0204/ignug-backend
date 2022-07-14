import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from '../pagination/pagination.dto';

export class FilterInformationStudentDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsString()
  readonly ancestralLanguage: string;

  @IsOptional()
  @IsString()
  readonly cellPhone: string;

  @IsOptional()
  @IsString()
  readonly companyName: string;

  @IsOptional()
  @IsNumber()
  readonly community: number;

  @IsOptional()
  @IsString()
  readonly conadisNumber: string;

  @IsOptional()
  @IsString()
  readonly contactEmergencyName: string;

  @IsOptional()
  @IsString()
  readonly contactEmergencyKinship: string;

  @IsOptional()
  @IsString()
  readonly contactEmergencyPhone: string;

  @IsOptional()
  @IsString()
  readonly degreeObtainedSuperior: string;

  @IsOptional()
  @IsString()
  readonly differentiatedPension: string;

  @IsOptional()
  @IsNumber()
  readonly disabilityPercentage: number;

  @IsOptional()
  @IsString()
  readonly disabilityType: string;

  @IsOptional()
  @IsNumber()
  readonly educationalAmount: number;

  @IsOptional()
  @IsString()
  readonly educationLevelMother: string;

  @IsOptional()
  @IsString()
  readonly educationLevelFather: string;

  @IsOptional()
  @IsNumber()
  readonly economicAmount: number;

  @IsOptional()
  @IsString()
  readonly economicPracticeSector: string;

  @IsOptional()
  @IsNumber()
  readonly familyIncome: number;

  @IsOptional()
  @IsString()
  readonly financingScholarshipType: string;

  @IsOptional()
  @IsString()
  readonly isExecutedPractice: string;

  @IsOptional()
  @IsString()
  readonly isExecutedCommunity: string;

  @IsOptional()
  @IsString()
  readonly isLostGratuity: string;

  @IsOptional()
  @IsString()
  readonly institutionPracticeType: string;

  @IsOptional()
  @IsNumber()
  readonly membersHouseNumber: number;

  @IsOptional()
  @IsString()
  readonly ocupation: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly postalCode: string;

  @IsOptional()
  @IsNumber()
  readonly practiceHours: number;

  @IsOptional()
  @IsNumber()
  readonly scholarshipAmount: number;

  @IsOptional()
  @IsString()
  readonly scholarshipReason1: string;

  @IsOptional()
  @IsString()
  readonly scholarshipReason2: string;

  @IsOptional()
  @IsString()
  readonly scholarshipReason3: string;

  @IsOptional()
  @IsString()
  readonly scholarshipReason4: string;

  @IsOptional()
  @IsString()
  readonly scholarshipReason5: string;

  @IsOptional()
  @IsString()
  readonly scholarshipReason6: string;

  @IsOptional()
  @IsString()
  readonly scholarshipType: string;

  @IsOptional()
  @IsNumber()
  readonly tariffScholarshipPercentage: number;
}
