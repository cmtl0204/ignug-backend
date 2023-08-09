import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from '@core/dto';
import { CataloguesService, InstitutionsService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class InstitutionsSeeder {
  constructor(
    private institutionsService: InstitutionsService,
    private cataloguesService: CataloguesService,
  ) {}

  async run() {
    await this.create();
  }

  async create() {
    const institutions: CreateInstitutionDto[] = [];
    const catalogues = (await this.cataloguesService.findAll()).data;

    const bloodType1 = catalogues.find((state) => {
      return (
        state.code === '1' && state.type === CatalogueCoreTypeEnum.BLOOD_TYPE
      );
    });

    const stateDisabled = catalogues.find((state) => {
      return (
        state.code === 'disabled' &&
        state.type === CatalogueCoreTypeEnum.CAREERS_STATE
      );
    });

    institutions.push(
      {
        code: 'ist1',
        name: 'Administrador',
        acronym: 'Adsds',
        state: stateEnabled,
      },
      {
        code: 'ist2',
        name: 'Administrador',
        acronym: 'Adsds',
        state: stateEnabled,
      },
    );

    for (const item of institutions) {
      await this.institutionsService.create(item);
    }
  }
}
