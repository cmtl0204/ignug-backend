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
import { PartialsSeeder } from './seeds/partials-seeder';
import { EnrollmentSeeder } from './seeds/enrollments-seeder';
import { GradeSeeder } from './seeds/grades-seeder';
import { ClassroomSeeder } from './seeds/classrooms-seeders';
import { SchoolPeriodSeeder } from './seeds/school-period-seeder';
import { TeachersSeeder } from './seeds/teachers-seeder';

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
    TeachersSeeder,
    SubjectsSeeder,
    CurriculumsSeeder,
    PartialsSeeder,
    EnrollmentSeeder,
    GradeSeeder,
    ClassroomSeeder,
    SchoolPeriodSeeder,
  ],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}
