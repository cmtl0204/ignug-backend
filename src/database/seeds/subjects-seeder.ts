import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { faker } from '@faker-js/faker';
import { join } from 'path';
import { SeedSubjectDto } from '@core/dto';
import { CatalogueEntity, CurriculumEntity } from '@core/entities';
import { CataloguesService, CurriculumsService, SubjectRequirementsService, SubjectsService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class SubjectsSeeder {
  private states: CatalogueEntity[] = [];
  private periods: CatalogueEntity[] = [];
  private types: CatalogueEntity[] = [];
  private curriculums: CurriculumEntity[] = [];

  constructor(
    private subjectService: SubjectsService,
    private subjectRequirementsService: SubjectRequirementsService,
    private catalogueService: CataloguesService,
    private curriculumsService: CurriculumsService,
  ) {}

  async run() {
    await this.loadCatalogues();
    await this.loadCurriculums();
    await this.createSubjects();
    await this.createRequirements();
  }

  private async loadCatalogues() {
    const catalogues = (await this.catalogueService.findAll()).data as CatalogueEntity[];

    this.states = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.SUBJECTS_STATE);

    this.periods = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD);

    this.types = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.SUBJECTS_TYPE);
  }

  private async loadCurriculums() {
    this.curriculums = (await this.curriculumsService.findAll()).data as CurriculumEntity[];
  }

  private async createSubjects() {
    const subjects: SeedSubjectDto[] = [];

    const stateEnabled = this.states.find((state: CatalogueEntity) => {
      return state.code === 'enabled' && state.type === CatalogueCoreTypeEnum.SUBJECTS_STATE;
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

    //curriculum
    const curriculum1 = this.curriculums.find((curriculum: CurriculumEntity) => curriculum.code === 'cod1');
    const curriculum2 = this.curriculums.find((curriculum: CurriculumEntity) => curriculum.code === 'cod2');

    //tipo asignatura
    const type = this.types.find(type => {
      return type.code === 'subject' && type.type === CatalogueCoreTypeEnum.SUBJECTS_TYPE;
    });

    subjects.push(
      {
        academicPeriod: first,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod1',
        credits: 10,
        isVisible: true,
        name: 'Asignatura 1',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod2',
        credits: 10,
        isVisible: true,
        name: 'Asignatura 2',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod3',
        credits: 10,
        isVisible: true,
        name: 'Asignatura 3',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod4',
        credits: 10,
        isVisible: true,
        name: 'Asignatura 4',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod5',
        credits: 10,
        isVisible: true,
        name: 'Asignatura 5',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod6',
        credits: 10,
        isVisible: true,
        name: 'Asignatura 6',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod7',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod8',
        credits: 10,
        isVisible: true,
        name: 'Asignatura 8',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod9',
        credits: 10,
        isVisible: true,
        name: 'Asignatura 9',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod10',
        credits: 10,
        isVisible: true,
        name: 'Asignatura 10',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod11',
        credits: 10,
        isVisible: true,
        name: 'Asignatura11',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod12',
        credits: 10,
        isVisible: true,
        name: 'Asignatura12',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod13',
        credits: 10,
        isVisible: true,
        name: 'Asignatura13',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod14',
        credits: 10,
        isVisible: true,
        name: 'Asignatura14',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod15',
        credits: 10,
        isVisible: true,
        name: 'Asignatura15',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod16',
        credits: 10,
        isVisible: true,
        name: 'Asignatura16',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod17',
        credits: 10,
        isVisible: true,
        name: 'Asignatura17',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod18',
        credits: 10,
        isVisible: true,
        name: 'Asignatura18',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod19',
        credits: 10,
        isVisible: true,
        name: 'Asignatura19',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod20',
        credits: 10,
        isVisible: true,
        name: 'Asignatura20',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod21',
        credits: 10,
        isVisible: true,
        name: 'Asignatura21',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod22',
        credits: 10,
        isVisible: true,
        name: 'Asignatura22',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod23',
        credits: 10,
        isVisible: true,
        name: 'Asignatura23',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod24',
        credits: 10,
        isVisible: true,
        name: 'Asignatura24',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod25',
        credits: 10,
        isVisible: true,
        name: 'Asignatura25',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod26',
        credits: 10,
        isVisible: true,
        name: 'Asignatura26',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod27',
        credits: 10,
        isVisible: true,
        name: 'Asignatura27',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod28',
        credits: 10,
        isVisible: true,
        name: 'Asignatura28',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod29',
        credits: 10,
        isVisible: true,
        name: 'Asignatura29',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod30',
        credits: 10,
        isVisible: true,
        name: 'Asignatura30',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod31',
        credits: 10,
        isVisible: true,
        name: 'Asignatura31',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod32',
        credits: 10,
        isVisible: true,
        name: 'Asignatura32',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod33',
        credits: 10,
        isVisible: true,
        name: 'Asignatura33',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod34',
        credits: 10,
        isVisible: true,
        name: 'Asignatura34',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod35',
        credits: 10,
        isVisible: true,
        name: 'Asignatura35',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod36',
        credits: 10,
        isVisible: true,
        name: 'Asignatura36',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod37',
        credits: 10,
        isVisible: true,
        name: 'Asignatura37',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod38',
        credits: 10,
        isVisible: true,
        name: 'Asignatura39',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod39',
        credits: 10,
        isVisible: true,
        name: 'Asignatura39',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod40',
        credits: 10,
        isVisible: true,
        name: 'Asignatura40',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
    );

    for (const subject of subjects) {
      await this.subjectService.create(subject);
    }
  }

  private async createRequirements() {
    const workbook = XLSX.readFile(join(process.cwd(), 'src/database/seeds/files/subject_requirements.xlsx'));

    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    for (const item of dataExcel) {
      const subject = await this.subjectService.findByCode(item['subject_code']);
      const requirement = await this.subjectService.findByCode(item['requirement_code']);

      await this.subjectRequirementsService.createPrerequisite({
        subject,
        requirement,
        isEnabled: true,
        type: item['type'],
      });
    }

    return true;
  }
}
