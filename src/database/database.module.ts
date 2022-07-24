import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeds/database-seeder';
import { CataloguesSeeder } from './seeds/catalogues-seeder';

@Global()
@Module({
  providers: [...databaseProviders, DatabaseSeeder, CataloguesSeeder],
  exports: [...databaseProviders, DatabaseSeeder, CataloguesSeeder],
})
export class DatabaseModule {}
