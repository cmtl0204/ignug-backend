import { Injectable } from '@nestjs/common';
import { CataloguesSeeder } from './catalogues-seeder';
import { UsersSeeder } from './users-seeder';
import { RolesSeeder } from './roles-seeder';
import { MenusSeeder } from './menus-seeder';
import * as fs from 'fs';
import { join } from 'path';
import { InstitutionsSeeder } from './institutions-seeder';
import { CareersSeeder } from './careers-seeder';
import { StudentsSeeder } from './students-seeder';
import { SubjectsSeeder } from './subjects-seeder';
import { CurriculumsSeeder } from './curriculums-seeder';
import { EnrollmentSeeder } from './enrollments-seeder';
import { GradeSeeder } from './grades-seeder';
import { ClassroomSeeder } from './classrooms-seeders';
import { LocationsSeeder } from './locations-seeder';
import { PartialsSeeder } from './partials-seeder';
import { SchoolPeriodSeeder } from './school-period-seeder';
import { TeachersSeeder } from './teachers-seeder';
import { TeacherDistributionsSeeder } from './teacher-distributions-seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private cataloguesSeeder: CataloguesSeeder,
    private usersSeeder: UsersSeeder,
    private rolesSeeder: RolesSeeder,
    private menusSeeder: MenusSeeder,
    private institutionsSeeder: InstitutionsSeeder,
    private careersSeeder: CareersSeeder,
    private schoolsPeriodsSeeder: SchoolPeriodSeeder,
    private studentsSeeder: StudentsSeeder,
    private teacherSeeder: TeachersSeeder,
    private curriculumsSeeder: CurriculumsSeeder,
    private subjectsSeeder: SubjectsSeeder,
    private partialsSeeder: PartialsSeeder,
    private enrollmentsSeeder: EnrollmentSeeder,
    private gradesSeeder: GradeSeeder,
    private classroomsSeeder: ClassroomSeeder,
    private locationsSeeder: LocationsSeeder,
    private teacherDistributionsSeeder: TeacherDistributionsSeeder,
  ) {}

  async run() {
    await this.cataloguesSeeder.run();
    await this.rolesSeeder.run();
    await this.institutionsSeeder.run();
    await this.usersSeeder.run();
    await this.menusSeeder.run();
    this.createUploadsDirectories();

    /** Seeders Core **/
    await this.careersSeeder.run();
    await this.schoolsPeriodsSeeder.run();
    await this.studentsSeeder.run();
    await this.teacherSeeder.run();
    await this.curriculumsSeeder.run();
    await this.subjectsSeeder.run();
    await this.partialsSeeder.run();
    await this.enrollmentsSeeder.run();
    // aqui iria el seeder de enrollmendetail xd
    await this.gradesSeeder.run();
    await this.classroomsSeeder.run();
    await this.locationsSeeder.run();
    await this.teacherDistributionsSeeder.run();
  }

  createUploadsDirectories() {
    const date = new Date();
    for (let i = date.getFullYear(); i < date.getFullYear() + 100; i++) {
      const path = `${join(process.cwd())}/src/resources/uploads/${i}`;
      fs.mkdir(path, err => {
        if (err) {
          // console.log(err);
        }
      });

      for (let j = 1; j <= 12; j++) {
        const path = `${join(process.cwd())}/src/resources/uploads/${i}/${j}`;
        fs.mkdir(path, err => {
          if (err) {
            // console.log(err);
          }
        });
      }
    }
  }
}
