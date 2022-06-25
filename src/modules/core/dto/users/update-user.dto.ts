import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@core/dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
