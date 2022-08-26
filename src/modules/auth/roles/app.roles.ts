import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'admin',
  TEACHER = 'teacher',
}

export enum AppResource {
  ADMIN = 'admin',
  TEACHER = 'teacher',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.TEACHER)
  .createOwn([AppResource.ADMIN])
  .updateOwn([AppResource.ADMIN])
  .deleteOwn([AppResource.ADMIN])
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.TEACHER)
  .createAny([AppResource.ADMIN])
  .readAny([AppResource.ADMIN])
  .updateAny([AppResource.ADMIN])
  .deleteAny([AppResource.ADMIN]);
