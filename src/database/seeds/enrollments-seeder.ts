import { Injectable } from '@nestjs/common';
import { CreateEnrollmentsDetailDto, CreateEnrollmentDto } from '@core/dto';
import { CataloguesService, CurriculumsService, EnrollmentsDetailService, SchoolPeriodsService, StudentsService, SubjectsService } from '@core/services';
import { EnrollmentsService } from 'src/modules/core/services';
import { CatalogueEntity, CurriculumEntity, EnrollmentEntity, SchoolPeriodEntity, StudentEntity, SubjectEntity } from '@core/entities';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class EnrollmentSeeder {
  private periods: CatalogueEntity[] = [];
  private parallel: CatalogueEntity[] = [];
  private types: CatalogueEntity[] = [];
  private states: CatalogueEntity[] = [];
  private workday: CatalogueEntity[] = [];
  private curriculums: CurriculumEntity[] = [];
  private students: StudentEntity[] = [];
  private schoolPeriods: SchoolPeriodEntity[] = [];
  private enrollments: EnrollmentEntity[] = [];
  private academicStates: CatalogueEntity[] = [];
  private subjects: SubjectEntity[] = [];

  constructor(private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
    private schoolPeriodsService: SchoolPeriodsService,
    private catalogueService: CataloguesService,
    private curriculumsService: CurriculumsService,
    private enrollmentsDetailService: EnrollmentsDetailService,
    private subjectsService: SubjectsService) { }

  async run() {
    await this.createEnrollments();
    await this.createEnrollmentsDetails();
    await this.loadCatalogues();
    await this.loadEnrollments();
  }

  async loadCatalogues() {
    const catalogues = (await this.catalogueService.findAll()).data as CatalogueEntity[];

    this.states = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_STATE);

    this.types = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_TYPE);

    this.periods = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD);

    this.parallel = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.PARALLEL);

    this.workday = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.WORKDAY);

    this.academicStates = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ACADEMIC_STATE);

  }

  async loadEnrollments() {
    this.enrollments = (await this.enrollmentsService.findAll()).data as EnrollmentEntity[];
  }

  async loadSubjects() {
    this.subjects = (await this.subjectsService.findAll()).data as SubjectEntity[];
  }

  async createEnrollments() {

    const enrollments: CreateEnrollmentDto[] = [];

    //states
    const stateEnabled = this.states.find((state: CatalogueEntity) => {
      return state.code === 'enable' && state.type === CatalogueCoreTypeEnum.SUBJECTS_STATE;
    });//xd

    //curriculums
    const curriculums = (await this.curriculumsService.findAll()).data;
    const curriculum = curriculums.find((curriculum: CurriculumEntity) => curriculum.code === 'cod1');

    //parallel
    const parallel = this.parallel.find(parallel => {
      return parallel.code === '1' && parallel.type === CatalogueCoreTypeEnum.PARALLEL;
    });

    //workday
    const workday = this.workday.find(workday => {
      return workday.code === '1' && workday.type === CatalogueCoreTypeEnum.WORKDAY;
    });

    //students
    const students = (await this.studentsService.findAll()).data;
    const student = students.find((student: StudentEntity) => student.user.identification === '123456781');

    //school periods
    const schoolPeriods = (await this.schoolPeriodsService.findAll()).data;
    const schoolPeriod = schoolPeriods.find((schoolPeriod: SchoolPeriodEntity) => schoolPeriod.code === 'cod1');

    //enrollment type
    const type = this.types.find(type => {
      return type.code === '1' && type.type === CatalogueCoreTypeEnum.ENROLLMENTS_TYPE;
    });

    //Periodo academico
    const first = this.periods.find((period: CatalogueEntity) => {
      return period.code === '1' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const second = this.periods.find((period: CatalogueEntity) => {
      return period.code === '2' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const third = this.periods.find((period: CatalogueEntity) => {
      return period.code === '3' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const fourth = this.periods.find((period: CatalogueEntity) => {
      return period.code === '4' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const fifth = this.periods.find((period: CatalogueEntity) => {
      return period.code === '5' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });

    enrollments.push(
      {
        code: 'cod1',
        date: new Date('2023-08-14'),
        application_at: new Date('2023-08-14'),
        folio: ' ',
        observation: 'No hay obsevaciones',
        student: student,
        academicPeriod: first,
        curriculum: curriculum,
        parallel: parallel,
        schoolPeriodEntity: schoolPeriod,
        state: stateEnabled,
        type: type,
        workday: workday
      },
      {
        code: 'cod2',
        date: new Date('2023-08-14'),
        application_at: new Date('2023-08-14'),
        folio: ' ',
        observation: 'No hay obsevaciones',
        student: student,
        academicPeriod: second,
        curriculum: curriculum,
        parallel: parallel,
        schoolPeriodEntity: schoolPeriod,
        state: stateEnabled,
        type: type,
        workday: workday
      }
    );

    for (const enrollment of enrollments) {
      await this.enrollmentsService.create(enrollment);
    }
  }

  async createEnrollmentsDetails() {
    const enrollmentDetails: CreateEnrollmentsDetailDto[] = [];

    //academic State
    const academicState = this.academicStates.find(academicState => {
      return academicState.code === '1' && academicState.type === CatalogueCoreTypeEnum.ACADEMIC_STATE;
    });

    //subjects
    const subject1 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'code1');
    const subject2 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'code2');
    const subject3 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'code3');
    const subject4 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'code4');

    //enrollments
    const enrollment1 = this.enrollments.find((enrollment: EnrollmentEntity) => enrollment.code === 'cod1');
    const enrollment2 = this.enrollments.find((enrollment: EnrollmentEntity) => enrollment.code === 'cod2');

    //parallel
    const parallel = this.parallel.find(parallel => {
      return parallel.code === '1' && parallel.type === CatalogueCoreTypeEnum.PARALLEL;
    });

    //states
    const stateEnabled = this.states.find((state: CatalogueEntity) => {
      return state.code === 'enable' && state.type === CatalogueCoreTypeEnum.SUBJECTS_STATE;
    });

    //enrollment type
    const type = this.types.find(type => {
      return type.code === '1' && type.type === CatalogueCoreTypeEnum.ENROLLMENTS_TYPE;
    });

    //workday
    const workday = this.workday.find(workday => {
      return workday.code === '1' && workday.type === CatalogueCoreTypeEnum.WORKDAY;
    });

    enrollmentDetails.push(
      {
        academicState: academicState,
        enrollment: enrollment1,
        parallel: parallel,
        state: stateEnabled,
        subject: subject1,
        type: type,
        workday: workday,
        number: 0,
        date: new Date('2023-08-14'),
        finalAttendance: 0,
        finalGrade: 0,
        observation: 'no hay observaciones'
      },
      {
        academicState: academicState,
        enrollment: enrollment1,
        parallel: parallel,
        state: stateEnabled,
        subject: subject2,
        type: type,
        workday: workday,
        number: 0,
        date: new Date('2023-08-14'),
        finalAttendance: 0,
        finalGrade: 0,
        observation: 'no hay observaciones'
      },
      {
        academicState: academicState,
        enrollment: enrollment1,
        parallel: parallel,
        state: stateEnabled,
        subject: subject3,
        type: type,
        workday: workday,
        number: 0,
        date: new Date('2023-08-14'),
        finalAttendance: 0,
        finalGrade: 0,
        observation: 'no hay observaciones'
      },
      {
        academicState: academicState,
        enrollment: enrollment1,
        parallel: parallel,
        state: stateEnabled,
        subject: subject4,
        type: type,
        workday: workday,
        number: 0,
        date: new Date('2023-08-14'),
        finalAttendance: 0,
        finalGrade: 0,
        observation: 'no hay observaciones'
      },
      {
        academicState: academicState,
        enrollment: enrollment2,
        parallel: parallel,
        state: stateEnabled,
        subject: subject1,
        type: type,
        workday: workday,
        number: 0,
        date: new Date('2023-08-14'),
        finalAttendance: 0,
        finalGrade: 0,
        observation: 'no hay observaciones'
      },
      {
        academicState: academicState,
        enrollment: enrollment2,
        parallel: parallel,
        state: stateEnabled,
        subject: subject2,
        type: type,
        workday: workday,
        number: 0,
        date: new Date('2023-08-14'),
        finalAttendance: 0,
        finalGrade: 0,
        observation: 'no hay observaciones'
      },
      {
        academicState: academicState,
        enrollment: enrollment2,
        parallel: parallel,
        state: stateEnabled,
        subject: subject3,
        type: type,
        workday: workday,
        number: 0,
        date: new Date('2023-08-14'),
        finalAttendance: 0,
        finalGrade: 0,
        observation: 'no hay observaciones'
      },
      {
        academicState: academicState,
        enrollment: enrollment2,
        parallel: parallel,
        state: stateEnabled,
        subject: subject4,
        type: type,
        workday: workday,
        number: 0,
        date: new Date('2023-08-14'),
        finalAttendance: 0,
        finalGrade: 0,
        observation: 'no hay observaciones'
      },
    );

    for (const enrollmentDetail of enrollmentDetails) {
      await this.enrollmentsDetailService.create(enrollmentDetail);
    }
  }
}
