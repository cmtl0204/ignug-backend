import { PartialType } from "@nestjs/swagger";
import { CreateCareerDto } from "@auth/dto";

export class UpdateCareerDto extends PartialType(CreateCareerDto) {}