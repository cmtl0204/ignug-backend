import { SetMetadata } from '@nestjs/common';
import { RoleModel } from '@auth/models';

export const ROLES = 'roles';

export const Roles = (...roles: RoleModel[]) => SetMetadata(ROLES, roles);
