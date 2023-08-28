import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import {
  AttendancesSeeder,
  CareersSeeder,
  CataloguesSeeder,
  ClassroomSeeder,
  CurriculumsSeeder,
  DatabaseSeeder,
  EnrollmentSeeder,
  GradeSeeder,
  InstitutionsSeeder,
  LocationsSeeder,
  MenusSeeder,
  PartialsSeeder,
  RolesSeeder,
  SchoolPeriodSeeder,
  StudentsSeeder,
  SubjectsSeeder,
  TeacherDistributionsSeeder,
  TeachersSeeder,
  UsersSeeder,
} from '@database/seeders';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    AttendancesSeeder,
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
    TeacherDistributionsSeeder,
  ],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}
