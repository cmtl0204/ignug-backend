import { PickType } from '@nestjs/swagger';
import { UserDto } from '@auth/dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class SeedUserDto extends PickType(UserDto, [
  'careers',
  'bloodType',
  'ethnicOrigin',
  'gender',
  'identificationType',
  'maritalStatus',
  'sex',
  'birthdate',
  'email',
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
