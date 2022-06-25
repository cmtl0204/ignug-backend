import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@users/dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
