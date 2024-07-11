import {DataSource} from 'typeorm';
import {
    ResidenceAddressEntity,
    AttendanceEntity,
    CareerAcademicPeriodsEntity,
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
    LocationEntity,
    PartialEntity,
    PartialPermissionEntity,
    ScheduleEntity,
    SchoolPeriodEntity,
    StudentEntity,
    SubjectEntity,
    SubjectCorequisiteEntity,
    SubjectPrerequisiteEntity,
    TeacherDistributionEntity,
    TeacherEntity,
    OriginAddressEntity,
    EnrollmentStateEntity,
    EnrollmentDetailStateEntity,
    CareerParallelEntity,

} from '@core/entities';
import {ConfigEnum, CoreRepositoryEnum} from '@shared/enums';
import { EvaluationEntity } from '../entities/evaluation.entity';
import { QuestionEntity } from '../entities/question.entity';
import { ResponseEntity } from '../entities/response.entity';
import { ResultEntity } from '../entities/result.entity';
import { StudentResultEntity } from '../entities/student-result.entity';



export const teacherEvaluationProviders = [
    {
        provide: CoreRepositoryEnum.ADDRESS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ResidenceAddressEntity),
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
        provide: CoreRepositoryEnum.CAREER_ACADEMIC_PERIOD_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CareerAcademicPeriodsEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.CAREER_PARALLEL_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CareerParallelEntity),
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
        provide: CoreRepositoryEnum.ENROLLMENT_DETAIL_STATE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EnrollmentDetailStateEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.ENROLLMENT_STATE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EnrollmentStateEntity),
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
        provide: CoreRepositoryEnum.ORIGIN_ADDRESS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(OriginAddressEntity),
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
        provide: CoreRepositoryEnum.RESIDENCE_ADDRESS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ResidenceAddressEntity),
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
        provide: CoreRepositoryEnum.SUBJECT_COREQUISITE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SubjectCorequisiteEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.SUBJECT_PREREQUISITE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SubjectPrerequisiteEntity),
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
    {
        provide: CoreRepositoryEnum.EVALUATION_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EvaluationEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.QUESTION_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(QuestionEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.RESPONSE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ResponseEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.RESULT_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ResultEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.STUDENT_RESULT_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(StudentResultEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
];
