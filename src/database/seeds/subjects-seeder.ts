import { Injectable } from '@nestjs/common';
import { CataloguesService, SubjectRequirementsService, SubjectsService } from '@core/services';
import { CreateSubjectDto } from '@core/dto';
import { CatalogueCoreSubjectRequirementTypeEnum, CatalogueCoreTypeEnum } from '@shared/enums';
import * as XLSX from 'xlsx';
import { join } from 'path';

@Injectable()
export class SubjectsSeeder {
  constructor(
    private subjectService: SubjectsService,
    private subjectRequirementsService: SubjectRequirementsService,
    private catalogueService: CataloguesService,
  ) {}

  async run() {
    await this.createSubjects();
    await this.createRequirements();
  }

  async createSubjects() {
    const subjects: CreateSubjectDto[] = [];

    const catalogues = (await this.catalogueService.findAll()).data;

    //const curriculum = (await this.curriculumService.findAll()).data;

    //estado
    const stateEnabled = catalogues.find(state => {
      return state.code === 'enable' && state.type === CatalogueCoreTypeEnum.SUBJECTS_STATE;
    });

    //Periodo academico
    const primero = catalogues.find(period => {
      return period.code === '1' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const segundo = catalogues.find(period => {
      return period.code === '2' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const tercero = catalogues.find(period => {
      return period.code === '3' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const cuarto = catalogues.find(period => {
      return period.code === '4' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const quinto = catalogues.find(period => {
      return period.code === '5' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });

    //curriculum
    // const curriculum1 = curriculum.find(
    //   (curriculum) => curriculum.code === 'curri1',
    // );

    //tipo asignatura
    const type = catalogues.find(type => {
      return type.code === '1' && type.type === CatalogueCoreTypeEnum.SUBJECTS_TYPE;
    });

    subjects.push(
      {
        academicPeriod: primero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod1',
        credits: 10,
        isVisible: true,
        name: 'Asignatura1',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: primero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod2',
        credits: 10,
        isVisible: true,
        name: 'Asignatura2',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: primero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod3',
        credits: 10,
        isVisible: true,
        name: 'Asignatura3',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: primero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod4',
        credits: 10,
        isVisible: true,
        name: 'Asignatura4',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: primero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod5',
        credits: 10,
        isVisible: true,
        name: 'Asignatura5',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: primero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod6',
        credits: 10,
        isVisible: true,
        name: 'Asignatura6',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: segundo,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod7',
        credits: 10,
        isVisible: true,
        name: 'Asignatura7',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: segundo,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod8',
        credits: 10,
        isVisible: true,
        name: 'Asignatura8',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: segundo,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod9',
        credits: 10,
        isVisible: true,
        name: 'Asignatura9',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: segundo,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod10',
        credits: 10,
        isVisible: true,
        name: 'Asignatura10',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: segundo,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod11',
        credits: 10,
        isVisible: true,
        name: 'Asignatura11',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: segundo,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod12',
        credits: 10,
        isVisible: true,
        name: 'Asignatura12',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: tercero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod13',
        credits: 10,
        isVisible: true,
        name: 'Asignatura13',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: tercero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod14',
        credits: 10,
        isVisible: true,
        name: 'Asignatura14',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: tercero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod15',
        credits: 10,
        isVisible: true,
        name: 'Asignatura15',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: tercero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod16',
        credits: 10,
        isVisible: true,
        name: 'Asignatura16',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: tercero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod17',
        credits: 10,
        isVisible: true,
        name: 'Asignatura17',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: tercero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod18',
        credits: 10,
        isVisible: true,
        name: 'Asignatura18',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: cuarto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod19',
        credits: 10,
        isVisible: true,
        name: 'Asignatura19',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: cuarto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod20',
        credits: 10,
        isVisible: true,
        name: 'Asignatura20',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: cuarto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod21',
        credits: 10,
        isVisible: true,
        name: 'Asignatura21',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: cuarto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod22',
        credits: 10,
        isVisible: true,
        name: 'Asignatura22',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: cuarto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod23',
        credits: 10,
        isVisible: true,
        name: 'Asignatura23',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: cuarto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod24',
        credits: 10,
        isVisible: true,
        name: 'Asignatura24',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: quinto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod25',
        credits: 10,
        isVisible: true,
        name: 'Asignatura25',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: quinto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod26',
        credits: 10,
        isVisible: true,
        name: 'Asignatura26',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: quinto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod27',
        credits: 10,
        isVisible: true,
        name: 'Asignatura27',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: quinto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod28',
        credits: 10,
        isVisible: true,
        name: 'Asignatura28',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: quinto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod29',
        credits: 10,
        isVisible: true,
        name: 'Asignatura29',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: quinto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod30',
        credits: 10,
        isVisible: true,
        name: 'Asignatura30',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: primero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod31',
        credits: 10,
        isVisible: true,
        name: 'Asignatura31',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: segundo,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod32',
        credits: 10,
        isVisible: true,
        name: 'Asignatura32',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: tercero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod33',
        credits: 10,
        isVisible: true,
        name: 'Asignatura33',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: cuarto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod34',
        credits: 10,
        isVisible: true,
        name: 'Asignatura34',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: quinto,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod35',
        credits: 10,
        isVisible: true,
        name: 'Asignatura35',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
      {
        academicPeriod: primero,
        curriculum: null,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'cod36',
        credits: 10,
        isVisible: true,
        name: 'Asignatura36',
        practicalHour: 50,
        scale: 1,
        teacherHour: 50,
      },
    );

    for (const subject of subjects) {
      await this.subjectService.create(subject);
    }
  }

  async createRequirements() {
    const workbook = XLSX.readFile(join(process.cwd(), 'src/database/seeds/files/subject_requirements.xlsx'));

    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    for (const item of dataExcel) {
      const subject = await this.subjectService.findByCode(item['subject_code']);
      const requirement = await this.subjectService.findByCode(item['requirement_code']);
      console.log(subject.code);
      console.log(requirement.code);
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
