import { PartialType } from '@nestjs/swagger';
import { CreateTeacherDistributiveDto } from '@core/dto';

export class UpdateTeacherDistributiveDto extends PartialType(CreateTeacherDistributiveDto) {}
