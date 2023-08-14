import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from '@core/dto';
import { CataloguesService, InstitutionsService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';
import { CatalogueEntity } from '@core/entities';

@Injectable()
export class InstitutionsSeeder {
  constructor(private institutionsService: InstitutionsService, private cataloguesService: CataloguesService) {}

  async run() {
    await this.create();
  }

  async create() {
    const institutions: CreateInstitutionDto[] = [];
    const catalogues = (await this.cataloguesService.findAll()).data;

    const stateEnable = catalogues.find((state: CatalogueEntity) => {
      return state.code === 'enable' && state.type === CatalogueCoreTypeEnum.INSTITUTIONS_STATE;
    });

    institutions.push(
      {
        state: stateEnable,
        acronym: 'ITSQ',
        cellphone: '0988888777',
        code: 'cod1',
        codeSniese: '123',
        denomination: 'Institución Educativa',
        email: 'instituto@edu.ec.com',
        isVisible: true,
        logo: 'img1',
        name: 'INSTITUTO TECNOLÓGICO SUPERIOR QUITO',
        phone: '2245666',
        shortName: 'Insituto Quito',
        slogan: 'Formamos tu propósito de vida',
        web: 'quito.com',
      },
      {
        state: stateEnable,
        acronym: 'ISTL',
        cellphone: '0955557776',
        code: 'cod2',
        codeSniese: '321',
        denomination: 'Institución Educativa',
        email: 'itsl@edu.ec.com',
        isVisible: true,
        logo: 'img2',
        name: 'INSTITUTO SUPERIOR TECNOLÓGICO LIBERTAD',
        phone: '2245333',
        shortName: 'Insituto Libertad',
        slogan: 'Estudia la carrera de tus sueños',
        web: 'istl.com',
      },
    );

    for (const item of institutions) {
      await this.institutionsService.create(item);
    }
  }
}
