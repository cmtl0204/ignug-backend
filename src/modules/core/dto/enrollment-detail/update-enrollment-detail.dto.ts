import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollmentsDetailDto } from '@core/dto';

export class UpdateEnrollmentsDetailDto extends PartialType(CreateEnrollmentsDetailDto) {}
