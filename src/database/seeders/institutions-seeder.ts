import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from '@core/dto';
import { CataloguesService, InstitutionsService } from '@core/services';
import { CatalogueTypeEnum } from '@shared/enums';
import { CatalogueEntity } from '@core/entities';
import { faker } from '@faker-js/faker';

@Injectable()
export class InstitutionsSeeder {
  constructor(private institutionsService: InstitutionsService, private cataloguesService: CataloguesService) {}

  async run() {
    await this.create();
  }

  private async create() {
    const institutions: CreateInstitutionDto[] = [];
    const catalogues = await this.cataloguesService.findCache();

    const stateEnable = catalogues.find((state: CatalogueEntity) => {
      return state.code === 'enabled' && state.type === CatalogueTypeEnum.INSTITUTIONS_STATE;
    });

    institutions.push(
      {
        state: stateEnable,
        acronym: 'ITSQ',
        cellphone: faker.phone.number(),
        code: 'cod1',
        codeSniese: '123',
        denomination: 'Institución Educativa',
        email: 'instituto@edu.ec.com',
        isVisible: true,
        logo: 'img1',
        name: 'INSTITUTO TECNOLÓGICO SUPERIOR QUITO',
        phone: '2245666',
        shortName: 'Insituto Quito',
        slogan: faker.hacker.phrase(),
        web: faker.internet.url(),
      },
      {
        state: stateEnable,
        acronym: 'ISTL',
        cellphone: faker.phone.number(),
        code: 'cod2',
        codeSniese: '321',
        denomination: 'Institución Educativa',
        email: 'itsl@edu.ec.com',
        isVisible: true,
        logo: 'img2',
        name: 'INSTITUTO SUPERIOR TECNOLÓGICO LIBERTAD',
        phone: '2245333',
        shortName: 'Insituto Libertad',
        slogan: faker.hacker.phrase(),
        web: faker.internet.url(),
      },
    );

    for (const item of institutions) {
      await this.institutionsService.create(item);
    }
  }
}
