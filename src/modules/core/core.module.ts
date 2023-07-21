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
  EventsController,
  TeachersController,
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
  EventsService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CareersController,
    CataloguesController,
    CurriculumsController,
    EventsController,
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
    EventsService,
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
    EventsService,
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
