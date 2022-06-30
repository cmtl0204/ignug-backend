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
  ],
})
export class CoreModule {}
