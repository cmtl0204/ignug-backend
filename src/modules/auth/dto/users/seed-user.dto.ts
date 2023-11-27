import { PickType } from '@nestjs/swagger';
import { UserDto } from '@auth/dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class SeedUserDto extends PickType(UserDto, [
  'careers',
  'identificationType',
  'birthdate',
  'cellPhone',
  'identification',
  'institutions',
  'email',
  'lastname',
  'name',
  'password',
  'passwordChanged',
  'personalEmail',
  'roles',
  'username',
]) {}
