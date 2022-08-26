import { Injectable } from '@nestjs/common';

import { roles } from '@auth/roles';

@Injectable()
export class AuthService {
  getRoles() {
    return roles.getRoles();
  }
}
