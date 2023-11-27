import { PickType } from '@nestjs/swagger';
import { UserDto } from '@auth/dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class SeedUserDto extends PickType(UserDto, [
  'careers',
  'identificationType',
  'birthdate',
  'identification',
  'institutions',
  'lastname',
  'name',
  'password',
  'passwordChanged',
  'personalEmail',
  'roles',
  'username',
]) {}
