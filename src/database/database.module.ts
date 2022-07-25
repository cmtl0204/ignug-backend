import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeds/database-seeder';
import { CataloguesSeeder } from './seeds/catalogues-seeder';
import { UsersSeeder } from './seeds/users-seeder';
import { UsersService } from '@auth/services';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    CataloguesSeeder,
    UsersSeeder,
  ],
  exports: [
    ...databaseProviders,
    DatabaseSeeder,
    CataloguesSeeder,
    UsersSeeder,
  ],
})
export class DatabaseModule {}
