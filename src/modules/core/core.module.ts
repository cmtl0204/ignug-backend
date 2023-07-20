import { Global, Module } from '@nestjs/common';
import {
  CareersController,
  CataloguesController,
  CurriculumsController,
  InformationStudentsController,
  InstitutionsController,
  SchoolPeriodsController,
  StudentsController,
  SubjectsController,
  InformationTeachersController,
} from '@core/controllers';
import {
  CareersService,
  CataloguesService,
  CurriculumsService,
  InformationStudentsService,
  InstitutionsService,
  SchoolPeriodsService,
  StudentsService,
  SubjectsService,
  InformationTeachersService,
  TeachersService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';
import { TeachersController } from './controllers/teachers.controller';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CareersController,
    CataloguesController,
    CurriculumsController,
    InformationStudentsController,
    InformationTeachersController,
    InstitutionsController,
    SchoolPeriodsController,
    StudentsController,
    SubjectsController,
    TeachersController,
  ],
  providers: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculumsService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    SchoolPeriodsService,
    StudentsService,
    SubjectsService,
    TeachersService,
  ],
  exports: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculumsService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    SchoolPeriodsService,
    StudentsService,
    SubjectsService,
    TeachersService,
  ],
})
export class CoreModule {}
