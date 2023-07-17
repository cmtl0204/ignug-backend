import { DataSource } from 'typeorm';
import {
  CareerEntity,
  CatalogueEntity,
  CurriculumEntity,
  InformationStudentEntity,
  InformationTeacherEntity,
  InstitutionEntity,
  StudentEntity,
  SubjectEntity,
  TeacherEntity,
} from '@core/entities';
import { ConfigEnum, RepositoryEnum } from '@shared/enums';

export const coreProviders = [
  {
    provide: RepositoryEnum.CAREER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CareerEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CATALOGUE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CURRICULUM_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CurriculumEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INFORMATION_STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InformationStudentEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INFORMATION_TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InformationTeacherEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INSTITUTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InstitutionEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StudentEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SUBJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubjectEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TeacherEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
];
