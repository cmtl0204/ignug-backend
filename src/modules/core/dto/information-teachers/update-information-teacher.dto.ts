import { PartialType } from '@nestjs/swagger';
import { CreateInformationTeacherDto } from './create-information-teacher.dto';

export class UpdateInformationTeacherDto extends PartialType(
  CreateInformationTeacherDto,
) {}
