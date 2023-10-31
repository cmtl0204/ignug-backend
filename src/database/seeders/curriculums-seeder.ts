import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { SeedCurriculumDto } from '@core/dto';
import { CareerEntity } from '@core/entities';
import { CataloguesService, CareersService, CurriculumsService } from '@core/services';
import { CatalogueTypeEnum } from '@shared/enums';

@Injectable()
export class CurriculumsSeeder {
  constructor(private cataloguesService: CataloguesService, private careersService: CareersService, private curriculumsService: CurriculumsService) {}

  async run() {
    await this.create();
  }

  private async create() {
    const curriculums: SeedCurriculumDto[] = [];

    const catalogues = await this.cataloguesService.findCache();
    const careers = (await this.careersService.findAll()).data;

    const stateEnabled = catalogues.find(state => {
      return state.code === 'enabled' && state.type === CatalogueTypeEnum.CURRICULUMS_STATE;
    });

    const career1 = careers.find((career: CareerEntity) => career.code === 'cod1');
    const career2 = careers.find((career: CareerEntity) => career.code === 'cod2');

    curriculums.push(
      {
        code: 'cod1',
        name: 'Malla Curricular 1',
        description: faker.lorem.lines(),
        periodicAcademicNumber: 1,
        resolutionNumber: '1',
        weeksNumber: faker.number.int({ min: 10, max: 30 }),
        state: stateEnabled,
        isVisible: true,
        career: career1,
      },
      {
        code: 'cod2',
        name: 'Malla Curricular 2',
        description: faker.lorem.lines(),
        periodicAcademicNumber: 2,
        resolutionNumber: '2',
        weeksNumber: faker.number.int({ min: 10, max: 30 }),
        state: stateEnabled,
        isVisible: true,
        career: career1,
      },
      {
        code: 'cod3',
        name: 'Malla Curricular 4',
        description: faker.lorem.lines(),
        periodicAcademicNumber: 3,
        resolutionNumber: '3',
        weeksNumber: faker.number.int({ min: 10, max: 30 }),
        state: stateEnabled,
        isVisible: true,
        career: career1,
      },
      {
        code: 'cod4',
        name: 'Malla Curricular 5',
        description: faker.lorem.lines(),
        periodicAcademicNumber: 4,
        resolutionNumber: '4',
        weeksNumber: faker.number.int({ min: 10, max: 30 }),
        state: stateEnabled,
        isVisible: true,
        career: career2,
      },
    );

    for (const curriculum of curriculums) {
      await this.curriculumsService.create(curriculum);
    }
  }
}
