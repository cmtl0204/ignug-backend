import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollmentDto } from '@core/dto';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {}
