import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@database';
import { GradesController } from './controllers';
import { GradesService } from './services/grades.service';
import { TeachersController } from './controllers';
import { TeachersService } from './services/teachers.service';
import { EnrollmentsController } from './controllers/enrollments.controller';
import { EnrollmentsService } from './services/enrollments.service';
import { SubjectsController } from './controllers/subjects.controller';
import { SubjectsService } from './services/subjects.service';
import { StudentsService } from './services/students.service';
import { StudentsController } from './controllers/students.controller';
import { RolesService } from '@auth/services';
import { TeacherDistributionsController } from './controllers/teacher-distributions.controller';
import { TeacherDistributionsService } from './services/teacher-distributions.service';


@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [GradesController,
    TeachersController,
    EnrollmentsController,
    SubjectsController,
    StudentsController,
    TeacherDistributionsController,
  ],
  providers: [
    GradesService,
    TeachersService,
    EnrollmentsService,
    SubjectsService,
    StudentsService,
    RolesService,
    TeacherDistributionsService
  ],
  exports: [],
})
export class ImportsModule {

}
