import { Injectable } from '@nestjs/common';
import {
  CataloguesService,
  SubjectsService,
} from '@core/services';
import { CreateSubjectDto } from '@core/dto';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class SubjectsSeeder {
  constructor(
    private subjectService: SubjectsService,
    private catalogueService: CataloguesService,
  ) {}

  async run() {
    await this.createSubjects();
  }

  async createSubjects() {
    const subjects: CreateSubjectDto[] = [];
    const catalogues = (await this.catalogueService.findAll()).data;
    const academiPeriod = (await this.catalogueService.findAll()).data;
    const type = (await this.catalogueService.findAll()).data;
    //const curriculum = (await this.curriculumService.findAll()).data;

    //estado
    const stateEnabled = catalogues.find((state) => {
      return (
        state.code === 'enable' &&
        state.type === CatalogueCoreTypeEnum.SUBJECTS_STATE
      );
    });

    const stateDisabled = catalogues.find((state) => {
      return (
        state.code === 'disabled' &&
        state.type === CatalogueCoreTypeEnum.SUBJECTS_STATE
      );
    });

    //Periodo academico
    const primero = academiPeriod.find((period) => {
      return (
        period.code === '1' &&
        period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD
      );
    });
    const segundo = academiPeriod.find((period) => {
      return (
        period.code === '2' &&
        period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD
      );
    });
    const tercero = academiPeriod.find((period) => {
      return (
        period.code === '3' &&
        period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD
      );
    });
    const cuarto = academiPeriod.find((period) => {
      return (
        period.code === '4' &&
        period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD
      );
    });
    const quinto = academiPeriod.find((period) => {
      return (
        period.code === '5' &&
        period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD
      );
    });

    //curriculum
    // const curriculum1 = curriculum.find(
    //   (curriculum) => curriculum.code === 'curri1',
    // );

    //tipo asignatura
    const subject = type.find((type) => {
      return (
        type.code === '1' && type.type === CatalogueCoreTypeEnum.SUBJECTS_TYPE
      );
    });

    subjects.push(
      {
        academicPeriod: primero,
        curriculum: null,
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
        type: subject,
        state: stateEnabled,
        autonomousHour: 10,
        code: '500dcb',
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
}
