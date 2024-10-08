import {Global, Module} from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {
    CareersController,
    CataloguesController,
    CurriculumsController, DashboardsController,
    EnrollmentDetailsController,
    EnrollmentsController,
    EventsController,
    GradesController,
    InformationStudentsController,
    InformationTeachersController,
    InstitutionsController, LocationsController,
    SchoolPeriodsController,
    SecretaryController,
    StudentsController,
    SubjectsController,
    TeacherDistributionsController,
    TeachersController,
} from '@core/controllers';
import {
    AddressesService,
    AttendancesService,
    CareerAcademicPeriodsService,
    CareersService,
    CareerParallelsService,
    CataloguesService,
    ClassroomsService,
    CurriculumsService,
    EnrollmentDetailsService,
    EnrollmentStatesService,
    EnrollmentsService,
    EventsService,
    GradesService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    LocationsService,
    PartialsService,
    SchoolPeriodsService,
    SecretaryService,
    SubjectCorequisitesService,
    SubjectPrerequisitesService,
    SubjectsService,
    TeacherDistributionsService,
} from '@core/services';
import {DatabaseModule} from '@database';
import {coreProviders} from '@core/providers';
import {EnrollmentDetailStatesService, OriginAddressesService, ResidenceAddressesService} from '@core/services';
import {StudentsService} from './services/students.service';
import {TeachersService} from './services/teachers.service';
import {authProviders} from '@auth/providers';
import {DashboardsService} from './services/dashboards.service';

@Global()
@Module({
    imports: [DatabaseModule, CacheModule.register()],
    controllers: [
        CareersController,
        CataloguesController,
        CurriculumsController,
        EnrollmentDetailsController,
        EnrollmentsController,
        EventsController,
        GradesController,
        InformationStudentsController,
        InformationTeachersController,
        InstitutionsController,
        SchoolPeriodsController,
        SecretaryController,
        StudentsController,
        SubjectsController,
        TeacherDistributionsController,
        TeachersController,
        LocationsController,
        DashboardsController,
    ],
    providers: [
        ...coreProviders,
        AttendancesService,
        CareerAcademicPeriodsService,
        CareersService,
        CataloguesService,
        ClassroomsService,
        CurriculumsService,
        EnrollmentDetailsService,
        EnrollmentStatesService,
        EnrollmentDetailStatesService,
        EnrollmentsService,
        EventsService,
        GradesService,
        InformationStudentsService,
        InformationTeachersService,
        InstitutionsService,
        LocationsService,
        OriginAddressesService,
        PartialsService,
        ResidenceAddressesService,
        SchoolPeriodsService,
        SecretaryService,
        StudentsService,
        SubjectCorequisitesService,
        SubjectPrerequisitesService,
        SubjectsService,
        TeacherDistributionsService,
        TeachersService,
        CareerParallelsService,
        DashboardsService
    ],
    exports: [
        ...coreProviders,
        AttendancesService,
        CareerAcademicPeriodsService,
        CareersService,
        CataloguesService,
        ClassroomsService,
        CurriculumsService,
        EnrollmentDetailsService,
        EnrollmentDetailStatesService,
        EnrollmentStatesService,
        EnrollmentsService,
        EventsService,
        GradesService,
        InformationStudentsService,
        InformationTeachersService,
        InstitutionsService,
        LocationsService,
        OriginAddressesService,
        PartialsService,
        ResidenceAddressesService,
        SchoolPeriodsService,
        SecretaryService,
        StudentsService,
        SubjectCorequisitesService,
        SubjectPrerequisitesService,
        SubjectsService,
        TeacherDistributionsService,
        TeachersService,
        CareerParallelsService,
    ],
})
export class CoreModule {

}
