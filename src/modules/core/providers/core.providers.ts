import { DataSource } from 'typeorm';
import {
  AddressEntity,
  AttendanceEntity,
  CareerEntity,
  CatalogueEntity,
  ClassroomEntity,
  CurriculumEntity,
  EnrollmentDetailEntity,
  EnrollmentEntity,
  EventEntity,
  GradeEntity,
  InformationStudentEntity,
  InformationTeacherEntity,
  InstitutionEntity,
  PartialEntity,
  ScheduleEntity,
  SchoolPeriodEntity,
  StudentEntity,
  SubjectEntity,
  SubjectRequirementEntity,
  TeacherDistributionEntity,
  TeacherEntity,
} from '@core/entities';
import { ConfigEnum, CoreRepositoryEnum } from '@shared/enums';
import { LocationEntity, PartialPermissionEntity } from '@core/entities';
import { ExportsService } from '../services/exports.service';

export const coreProviders = [
  {
    provide: CoreRepositoryEnum.ADDRESS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AddressEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.ATTENDANCE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AttendanceEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.CAREER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CareerEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.CATALOGUE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CatalogueEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.CLASSROOM_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ClassroomEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.CURRICULUM_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CurriculumEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.ENROLLMENT_DETAIL_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EnrollmentDetailEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.ENROLLMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EnrollmentEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.EVENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EventEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.GRADE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(GradeEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.INFORMATION_STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(InformationStudentEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.INFORMATION_TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(InformationTeacherEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.INSTITUTION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(InstitutionEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.LOCATION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(LocationEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.PARTIAL_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PartialEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.PARTIAL_PERMISSION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PartialPermissionEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.SCHOOL_PERIOD_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SchoolPeriodEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.SCHEDULE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ScheduleEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StudentEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.SUBJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SubjectEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.SUBJECT_REQUIREMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SubjectRequirementEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.TEACHER_DISTRIBUTION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TeacherDistributionEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TeacherEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
];
