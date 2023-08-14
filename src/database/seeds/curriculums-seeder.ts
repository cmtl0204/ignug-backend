import { Injectable } from '@nestjs/common';
import { CataloguesService, CareersService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';
import { CareerEntity } from '@core/entities';
import{faker} from '@faker-js/faker';
import { SeedCurriculumDto } from 'src/modules/core/dto/curriculum/seed-curriculum.dto';

@Injectable()
export class CurriculumsSeeder {
  constructor(private cataloguesService: CataloguesService, private careersService: CareersService) {}

  async run() {
    await this.create();
  }

  async create() {
    const curriculums: SeedCurriculumDto[] = [];

    const catalogues = (await this.cataloguesService.findAll()).data;
    const careers = (await this.careersService.findAll()).data;

    const stateEnabled = catalogues.find(state => {
      return state.code === 'enable' && state.type === CatalogueCoreTypeEnum.CURRICULUMS_STATE;
    });

    const career1 = careers.find((career: CareerEntity) => career.code === 'cod1');
    const career2 = careers.find(career => career.code === 'care2');

    curriculums.push(
      {
        code: 'cod1',
        name: 'Administrador',
        description: faker.lorem.lines(),
        periodicAcademicNumber: 1,
        resolutionNumber: '1',
        weeksNumber: faker.number.int({ min: 10, max: 30 }) ,
        state: stateEnabled,
        isVisible: stateEnabled,
        career: career1,
      },
      {
        code: 'cod2',
        name: 'Administrador',
        description: faker.lorem.lines(),
        periodicAcademicNumber: 2,
        resolutionNumber: '2',
        weeksNumber: faker.number.int({ min: 10, max: 30 }),
        state: stateEnabled,
        isVisible: stateEnabled,
        career: career1,
      },
      {
        code: 'cod3',
        name: 'Administrador',
        description: faker.lorem.lines(),
        periodicAcademicNumber: 3,
        resolutionNumber: '3',
        weeksNumber: faker.number.int({ min: 10, max: 30 }),
        state: stateEnabled,
        isVisible: stateEnabled,
        career: career1,
      },
      {
        code: 'cod4',
        name: 'Administrador',
        description: faker.lorem.lines(),
        periodicAcademicNumber: 4,
        resolutionNumber: '4',
        weeksNumber: faker.number.int({ min: 10, max: 30 }),
        state: stateEnabled,
        isVisible: stateEnabled,
        career: career2,
      },
      {
        code: 'cod5',
        name: 'Administrador',
        description: faker.lorem.lines(),
        periodicAcademicNumber: 5,
        resolutionNumber: '5',
        weeksNumber: faker.number.int({ min: 10, max: 30 }),
        state: stateEnabled,
        isVisible: stateEnabled,
        career: career2,
      },
      {
        code: 'cod6',
        name: 'Administrador',
        description: faker.lorem.lines(),
        periodicAcademicNumber: 6,
        resolutionNumber: '6',
        weeksNumber: faker.number.int({ min: 10, max: 30 }),
        state: stateEnabled,
        isVisible: stateEnabled,
        career: career2,
      },
    );
  }
}
