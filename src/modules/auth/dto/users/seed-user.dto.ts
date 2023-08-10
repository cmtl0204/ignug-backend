import { PickType } from '@nestjs/swagger';
import { UserDto } from '@auth/dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateUserDto extends PickType(UserDto, [
  'avatar',
  'birthdate',
  'email',
  'identification',
  'lastname',
  'name',
  'password',
  'passwordChanged',
  'personalEmail',
  'roles',
  'username',
]) {}
