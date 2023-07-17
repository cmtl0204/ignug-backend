import { DataSource } from 'typeorm';
import {
  MenuEntity,
  PermissionEntity,
  RoleEntity,
  UserEntity,
} from '@auth/entities';
import { ConfigEnum, RepositoryEnum } from '@shared/enums';

export const authProviders = [
  {
    provide: RepositoryEnum.MENU_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MenuEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PERMISSION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PermissionEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.ROLE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoleEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
];
