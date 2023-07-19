import { DataSource } from 'typeorm';
import {
  CareerEntity,
  CatalogueEntity,
  CurriculumEntity,
  EventEntity,
  InformationStudentEntity,
  InformationTeacherEntity,
  InstitutionEntity,
  SchoolPeriodEntity,
  StudentEntity,
  SubjectEntity,
  TeacherEntity,
} from '@core/entities';
import { ConfigEnum, CoreRepositoryEnum } from '@shared/enums';

export const coreProviders = [
  {
    provide: CoreRepositoryEnum.CAREER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CareerEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.CATALOGUE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.CURRICULUM_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CurriculumEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.INFORMATION_STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InformationStudentEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.INFORMATION_TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InformationTeacherEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.INSTITUTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InstitutionEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StudentEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.SUBJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubjectEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TeacherEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.SCHOOL_PERIOD_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SchoolPeriodEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.EVENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EventEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
];
