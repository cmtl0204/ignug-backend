import { PickType } from '@nestjs/swagger';
import { UserDto } from '@auth/dto';

export class CreateUserDto extends PickType(UserDto, [
  'email', 'identificationType', 'identification', 'institution', 'careers', 'lastname', 'name', 'password', 'passwordChanged', 'roles', 'username',
]) {
}
