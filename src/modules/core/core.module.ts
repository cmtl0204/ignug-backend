import { Global, Module } from '@nestjs/common';
import {
  CareersController,
  CataloguesController,
  CurriculaController,
  InformationStudentsController,
  InstitutionsController,
  StudentsController,
  SubjectsController,
  TeachersController,
  UsersController,
} from '@core/controllers';
import {
  CareersService,
  CataloguesService,
  CurriculaServic,
  InformationStudentsService,
  InstitutionsService,
  StudentsService,
  SubjectsService,
  TeachersService,
  UsersService,
} from '@core/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CareerEntity,
  CatalogueEntity,
  CurriculumEntity,
  InformationStudentEntity,
  InstitutionEntity,
  StudentEntity,
  SubjectEntity,
  TeacherEntity,
  UserEntity,
} from '@core/entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CareerEntity,
      CatalogueEntity,
      CurriculumEntity,
      InformationStudentEntity,
      InstitutionEntity,
      StudentEntity,
      SubjectEntity,
      TeacherEntity,
      UserEntity,
    ]),
  ],
  controllers: [
    CareersController,
    CataloguesController,
    CurriculaController,
    InformationStudentsController,
    InstitutionsController,
    StudentsController,
    SubjectsController,
    TeachersController,
    UsersController,
  ],
  providers: [
    CareersService,
    CataloguesService,
    CurriculaServic,
    InformationStudentsService,
    InstitutionsService,
    StudentsService,
    SubjectsService,
    TeachersService,
    UsersService,
  ],
  exports: [
    TypeOrmModule,
    CareersService,
    CataloguesService,
    CurriculaServic,
    InformationStudentsService,
    InstitutionsService,
    StudentsService,
    SubjectsService,
    TeachersService,
    UsersService,
  ],
})
export class CoreModule {}
