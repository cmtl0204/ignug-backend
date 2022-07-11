
import { IsOptional } from 'class-validator';
import { PaginationDto } from '../pagination/pagination.dto';

export class FilterCurriculumDto extends PaginationDto {
  @IsOptional({ message: 'address no debe estar vacío' })
  readonly code: string;

  @IsOptional({ message: 'address no debe estar vacío' })
  readonly description: string;

  @IsOptional({ message: 'name no debe estar vacío' })
  readonly name: string;

  @IsOptional({ message: 'address no debe estar vacío' })
  readonly periodicAcademicNumber: number;

  @IsOptional({ message: 'address no debe estar vacío' })
  readonly resolutionNumber: string;

  @IsOptional({ message: 'address no debe estar vacío' })
  readonly weeksNumber: number;

}
