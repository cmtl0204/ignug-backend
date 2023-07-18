import { DataSource } from 'typeorm';
import { ConfigEnum, RepositoryEnum } from '@shared/enums';
import { FileEntity } from '@common/entities';

export const commonProviders = [
  {
    provide: RepositoryEnum.FILE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FileEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
];
