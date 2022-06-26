import { SetMetadata } from '@nestjs/common';
import { RoleModel } from '../models/role.model';

export const ROLES = 'roles';

export const Roles = (...roles: RoleModel[]) => SetMetadata(ROLES, roles);
