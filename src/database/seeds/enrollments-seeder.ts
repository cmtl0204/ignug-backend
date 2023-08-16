import { Injectable } from '@nestjs/common';
import { CreateEnrollmentsDetailDto, CreateEnrollmentDto } from '@core/dto';
import { CataloguesService, CurriculumsService, EnrollmentsDetailService, SchoolPeriodsService, StudentsService, SubjectsService } from '@core/services';
import { EnrollmentsService } from 'src/modules/core/services';
import { CatalogueEntity, CurriculumEntity, EnrollmentEntity, SchoolPeriodEntity, StudentEntity, SubjectEntity } from '@core/entities';
import { CatalogueCoreTypeEnum } from '@shared/enums';
import { faker } from '@faker-js/faker';

@Injectable()
export class EnrollmentSeeder {
  private periods: CatalogueEntity[] = [];
  private parallels: CatalogueEntity[] = [];
  private types: CatalogueEntity[] = [];
  private states: CatalogueEntity[] = [];
  private workdays: CatalogueEntity[] = [];
  private curriculums: CurriculumEntity[] = [];
  private students: StudentEntity[] = [];
  private schoolPeriods: SchoolPeriodEntity[] = [];
  private enrollments: EnrollmentEntity[] = [];
  private academicStates: CatalogueEntity[] = [];
  private subjects: SubjectEntity[] = [];

  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
    private schoolPeriodsService: SchoolPeriodsService,
    private catalogueService: CataloguesService,
    private curriculumsService: CurriculumsService,
    private enrollmentsDetailService: EnrollmentsDetailService,
    private subjectsService: SubjectsService,
  ) {}

  async run() {
    await this.loadCatalogues();
    await this.loadCurriculums();
    await this.loadSchoolPeriods();
    await this.loadStudents();
    await this.loadSubjects();
    await this.createEnrollments();
    await this.createEnrollmentsDetails();
  }

  async loadCatalogues() {
    const catalogues = (await this.catalogueService.findAll()).data as CatalogueEntity[];

    this.states = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_STATE);

    this.types = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_TYPE);

    this.periods = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD);

    this.parallels = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.PARALLEL);

    this.workdays = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY);

    this.academicStates = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_ACADEMIC_STATE);
  }

  async loadCurriculums() {
    this.curriculums = (await this.curriculumsService.findAll()).data;
  }

  async loadSchoolPeriods() {
    this.schoolPeriods = (await this.schoolPeriodsService.findAll()).data;
  }

  async loadStudents() {
    this.students = (await this.studentsService.findAll()).data;
  }

  async loadSubjects() {
    this.subjects = (await this.subjectsService.findAll()).data as SubjectEntity[];
  }

  async createEnrollments() {
    const enrollments: CreateEnrollmentDto[] = [];

    //states
    const state = this.states.find((state: CatalogueEntity) => {
      return state.code === 'registered' && state.type === CatalogueCoreTypeEnum.ENROLLMENTS_STATE;
    });

    //curriculums
    const curriculum = this.curriculums.find((curriculum: CurriculumEntity) => curriculum.code === 'cod1');

    //parallel
    const parallel = this.parallels.find(parallel => {
      return parallel.code === 'a' && parallel.type === CatalogueCoreTypeEnum.PARALLEL;
    });

    //workday
    const workday = this.workdays.find(workday => {
      return workday.code === 'm' && workday.type === CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY;
    });

    //students
    const student1 = this.students[0];
    const student2 = this.students[1];

    //school periods
    const schoolPeriod = this.schoolPeriods.find((schoolPeriod: SchoolPeriodEntity) => schoolPeriod.code === 'cod1');

    //enrollment type
    const type = this.types.find(type => {
      return type.code === 'ordinary' && type.type === CatalogueCoreTypeEnum.ENROLLMENTS_TYPE;
    });

    //Periodo academico
    const first = this.periods.find((period: CatalogueEntity) => {
      return period.code === '1' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const second = this.periods.find((period: CatalogueEntity) => {
      return period.code === '2' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });

    enrollments.push(
      {
        code: 'cod1',
        date: new Date('2023-08-14'),
        applicationsAt: new Date('2023-08-14'),
        folio: faker.string.alphanumeric(),
        observation: 'No hay obsevaciones',
        student: student1,
        academicPeriod: first,
        curriculum: curriculum,
        parallel: parallel,
        schoolPeriodEntity: schoolPeriod,
        state: state,
        type: type,
        workday: workday,
      },
      {
        code: 'cod2',
        date: new Date('2023-08-14'),
        applicationsAt: new Date('2023-08-14'),
        folio: faker.string.alphanumeric(),
        observation: 'No hay obsevaciones',
        student: student2,
        academicPeriod: second,
        curriculum: curriculum,
        parallel: parallel,
        schoolPeriodEntity: schoolPeriod,
        state: state,
        type: type,
        workday: workday,
      },
    );

    for (const enrollment of enrollments) {
      await this.enrollmentsService.create(enrollment);
    }
  }

  async createEnrollmentsDetails() {
    const enrollmentDetails: CreateEnrollmentsDetailDto[] = [];

    //academic State
    const academicState = this.academicStates.find(academicState => {
      return academicState.code === 'a' && academicState.type === CatalogueCoreTypeEnum.ENROLLMENTS_ACADEMIC_STATE;
    });

    //subjects
    const subject1 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'cod1');
    const subject2 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'cod2');
    const subject3 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'cod3');
    const subject4 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'cod4');
    const subject5 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'cod5');
    const subject6 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'cod6');
    const subject7 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'cod7');
    const subject8 = this.subjects.find((subjects: SubjectEntity) => subjects.code === 'cod8');

    //enrollments
    this.enrollments = (await this.enrollmentsService.findAll()).data;
    const enrollment1 = this.enrollments.find((enrollment: EnrollmentEntity) => enrollment.code === 'cod1');
    const enrollment2 = this.enrollments.find((enrollment: EnrollmentEntity) => enrollment.code === 'cod2');

    //parallel
    const parallel = this.parallels.find(parallel => {
      return parallel.code === 'a' && parallel.type === CatalogueCoreTypeEnum.PARALLEL;
    });

    //states
    const state = this.states.find((state: CatalogueEntity) => {
      return state.code === 'registered' && state.type === CatalogueCoreTypeEnum.ENROLLMENTS_STATE;
    });

    //enrollment type
    const type = this.types.find(type => {
      return type.code === 'ordinary' && type.type === CatalogueCoreTypeEnum.ENROLLMENTS_TYPE;
    });

    //workday
    const workday = this.workdays.find(workday => {
      return workday.code === 'm' && workday.type === CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY;
    });

    enrollmentDetails.push(
      {
        academicState: academicState,
        enrollment: enrollment1,
        parallel: parallel,
        state: state,
        subject: subject1,
        type: type,
        workday: workday,
        number: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
        date: new Date('2023-08-14'),
        finalAttendance: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        finalGrade: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        observation: 'no hay observaciones',
      },
      {
        academicState: academicState,
        enrollment: enrollment1,
        parallel: parallel,
        state: state,
        subject: subject2,
        type: type,
        workday: workday,
        number: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
        date: new Date('2023-08-14'),
        finalAttendance: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        finalGrade: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        observation: 'no hay observaciones',
      },
      {
        academicState: academicState,
        enrollment: enrollment1,
        parallel: parallel,
        state: state,
        subject: subject3,
        type: type,
        workday: workday,
        number: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
        date: new Date('2023-08-14'),
        finalAttendance: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        finalGrade: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        observation: 'no hay observaciones',
      },
      {
        academicState: academicState,
        enrollment: enrollment1,
        parallel: parallel,
        state: state,
        subject: subject4,
        type: type,
        workday: workday,
        number: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
        date: new Date('2023-08-14'),
        finalAttendance: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        finalGrade: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        observation: 'no hay observaciones',
      },
      {
        academicState: academicState,
        enrollment: enrollment2,
        parallel: parallel,
        state: state,
        subject: subject5,
        type: type,
        workday: workday,
        number: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
        date: new Date('2023-08-14'),
        finalAttendance: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        finalGrade: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        observation: 'no hay observaciones',
      },
      {
        academicState: academicState,
        enrollment: enrollment2,
        parallel: parallel,
        state: state,
        subject: subject6,
        type: type,
        workday: workday,
        number: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
        date: new Date('2023-08-14'),
        finalAttendance: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        finalGrade: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        observation: 'no hay observaciones',
      },
      {
        academicState: academicState,
        enrollment: enrollment2,
        parallel: parallel,
        state: state,
        subject: subject7,
        type: type,
        workday: workday,
        number: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
        date: new Date('2023-08-14'),
        finalAttendance: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        finalGrade: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        observation: 'no hay observaciones',
      },
      {
        academicState: academicState,
        enrollment: enrollment2,
        parallel: parallel,
        state: state,
        subject: subject8,
        type: type,
        workday: workday,
        number: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
        date: new Date('2023-08-14'),
        finalAttendance: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        finalGrade: faker.helpers.rangeToNumber({ min: 7, max: 10 }),
        observation: 'no hay observaciones',
      },
    );

    for (const enrollmentDetail of enrollmentDetails) {
      await this.enrollmentsDetailService.create(enrollmentDetail);
    }
  }
}
