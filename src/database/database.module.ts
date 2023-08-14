import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeds/database-seeder';
import { CareersSeeder } from './seeds/careers-seeder';
import { CataloguesSeeder } from './seeds/catalogues-seeder';
import { CurriculumsSeeder } from './seeds/curriculums-seeder';
import { InstitutionsSeeder } from './seeds/institutions-seeder';
import { LocationsSeeder } from './seeds/locations-seeder';
import { MenusSeeder } from './seeds/menus-seeder';
import { RolesSeeder } from './seeds/roles-seeder';
import { StudentsSeeder } from './seeds/students-seeder';
import { SubjectsSeeder } from './seeds/subjects-seeder';
import { UsersSeeder } from './seeds/users-seeder';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    CataloguesSeeder,
    UsersSeeder,
    RolesSeeder,
    MenusSeeder,
    LocationsSeeder,
    CareersSeeder,
    InstitutionsSeeder,
    StudentsSeeder,
    SubjectsSeeder,
    CurriculumsSeeder,
  ],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}
