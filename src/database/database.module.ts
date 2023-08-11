import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeds/database-seeder';
import { CataloguesSeeder } from './seeds/catalogues-seeder';
import { UsersSeeder } from './seeds/users-seeder';
import { RolesSeeder } from './seeds/roles-seeder';
import { MenusSeeder } from './seeds/menus-seeder';
import { LocationsSeeder } from './seeds/locations-seeder';
import { CareersSeeder } from './seeds/careers-seeder';
import { InstitutionsSeeder } from './seeds/institutions-seeder';
import { StudentSeeder } from './seeds/student-seeder';
import { SubjectsSeeder } from './seeds/subjects-seeder';
import { CurriculumsSeeder } from './seeds/curriculums-seeder';

@Global()
@Module({
  providers: [...databaseProviders, DatabaseSeeder, CataloguesSeeder, UsersSeeder, RolesSeeder, MenusSeeder, LocationsSeeder, CareersSeeder, InstitutionsSeeder, StudentSeeder, SubjectsSeeder, CurriculumsSeeder],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}
