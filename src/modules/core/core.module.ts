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
  SubjectEntity,
  InformationTeacherEntity,
} from '@core/entities';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CareersController,
    CataloguesController,
    // CurriculaController,
    // InformationStudentsController,
    // InformationTeachersController,
    // InstitutionsController,
    StudentsController,
    // SubjectsController,
  ],
  providers: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    // CurriculaService,
    // InformationStudentsService,
    // InstitutionsService,
    StudentsService,
    // SubjectsService,
    // InformationTeachersService,
  ],
  exports: [
    CareersService,
    CataloguesService,
    // CurriculaService,
    // InformationStudentsService,
    // InformationTeachersService,
    // InstitutionsService,
    // SubjectsService,
    StudentsService,
  ],
})
export class CoreModule {}
