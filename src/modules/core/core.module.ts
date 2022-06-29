import { Global, Module } from '@nestjs/common';
import {
  CareersController,
  CataloguesController,
  CurriculaController,
  InformationStudentsController,
  InstitutionsController,
  StudentsController,
  SubjectsController,
  InformationTeachersController,
  UsersController,
} from '@core/controllers';
import {
  CareersService,
  CataloguesService,
  CurriculaService,
  InformationStudentsService,
  InstitutionsService,
  StudentsService,
  SubjectsService,
  InformationTeachersService,
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
  InformationTeacherEntity,
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
      InformationTeacherEntity,
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
    InformationTeachersController,
    UsersController,
  ],
  providers: [
    CareersService,
    CataloguesService,
    CurriculaService,
    InformationStudentsService,
    InstitutionsService,
    StudentsService,
    SubjectsService,
    InformationTeachersService,
    UsersService,
  ],
  exports: [
    TypeOrmModule,
    CareersService,
    CataloguesService,
    CurriculaService,
    InformationStudentsService,
    InstitutionsService,
    StudentsService,
    SubjectsService,
    InformationTeachersService,
    UsersService,
  ],
})
export class CoreModule {}
