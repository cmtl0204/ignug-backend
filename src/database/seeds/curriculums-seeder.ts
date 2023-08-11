import { Injectable } from '@nestjs/common';
import { CreateCareerDto, CreateCurriculumDto } from '@core/dto';
import {
  CurriculumsService,
  CataloguesService,
  CareersService,
} from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class CurriculumsSeeder {
  constructor(
    private curriculumsService: CurriculumsService,
    private cataloguesService: CataloguesService,
    private careersService: CareersService,
  ) {}

  async run() {
    await this.create();
  }

  async create() {
    const curriculums: CreateCurriculumDto[] = [];
    const catalogues = (await this.cataloguesService.findAll()).data;
    const careers = (await this.careersService.findAll()).data;

    const stateEnabled = catalogues.find((state) => {
      return (
        state.code === 'enable' &&
        state.type === CatalogueCoreTypeEnum.CURRICULUMS_STATE
      );
    });

    const stateDisabled = catalogues.find((state) => {
    return (
      state.code === 'disabled' &&
      state.type === CatalogueCoreTypeEnum.CURRICULUMS_STATE
    );
    
  });

  const career1 = careers.find(
    (career) => career.code === 'care1',
  );
  const career2 = careers.find(
    (career) => career.code === 'care2',
  );

  curriculums.push(
    {
      code: '11' ,
      name: 'Administrador',
      description: 'descipcionprueba',
      periodicAcademicNumber: 11,
      resolutionNumber:'11',
      weeksNumber: 11,
      state: stateEnabled,
      isVisible: stateEnabled,
      career: career1,
    },
    {
      code: '12' ,
      name: 'Administrador',
      description: 'descipcionprueba',
      periodicAcademicNumber: 12,
      resolutionNumber:'12',
      weeksNumber: 12,
      state: stateEnabled,
      isVisible: stateEnabled,
      career: career1,
    },
    {
      code: '13' ,
      name: 'Administrador',
      description: 'descipcionprueba',
      periodicAcademicNumber: 13,
      resolutionNumber:'13',
      weeksNumber: 13,
      state: stateEnabled,
      isVisible: stateEnabled,
      career: career1,
    },
    {
      code: '14' ,
      name: 'Administrador',
      description: 'descipcionprueba',
      periodicAcademicNumber: 14,
      resolutionNumber:'14',
      weeksNumber: 14,
      state: stateEnabled,
      isVisible: stateEnabled,
      career: career2,
    },
    {
      code: '15' ,
      name: 'Administrador',
      description: 'descipcionprueba',
      periodicAcademicNumber: 15,
      resolutionNumber:'15',
      weeksNumber: 15,
      state: stateEnabled,
      isVisible: stateEnabled,
      career: career2,
    },
    {
      code: '16' ,
      name: 'Administrador',
      description: 'descipcionprueba',
      periodicAcademicNumber: 16,
      resolutionNumber:'16',
      weeksNumber: 16,
      state: stateEnabled,
      isVisible: stateEnabled,
      career: career2,
    },  
    );
}
}