import { Injectable } from '@nestjs/common';
import { CreateCareerDto, CreateInstitutionDto } from '@core/dto';
import { CareersService, CataloguesService, InstitutionsService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class CareersSeeder {
  constructor(private institutionsService: InstitutionsService, private cataloguesService: CataloguesService, private careersService: CareersService) {}

  async run() {
    await this.create();
  }

  async create() {
    // const careers: CreateCareerDto[] = [];
    // const catalogues = (await this.cataloguesService.findAll()).data;
    // const institutions = (await this.institutionsService.findAll()).data;
    //
    // const stateEnabled = catalogues.find((state) => {
    //   return (
    //     state.code === 'enable' &&
    //     state.type === CatalogueCoreTypeEnum.CAREERS_STATE
    //   );
    // });
    //
    // const stateDisabled = catalogues.find((state) => {
    //   return (
    //     state.code === 'disabled' &&
    //     state.type === CatalogueCoreTypeEnum.CAREERS_STATE
    //   );
    // });
    //
    // const institution1 = institutions.find(
    //   (institution) => institution.code === 'ist1',
    // );
    // const institution2 = institutions.find(
    //   (institution) => institution.code === 'ist2',
    // );
    //
    // careers.push(
    //   {
    //     code: 'admin',
    //     name: 'Administrador',
    //     acronym: 'Adsds',
    //     state: stateEnabled,
    //     institution: institution1,
    //   },
    //   {
    //     code: 'admin',
    //     name: 'Administrador',
    //     acronym: 'Adsds',
    //     state: stateEnabled,
    //     institution: institution1,
    //   },
    //   {
    //     code: 'admin',
    //     name: 'Administrador',
    //     acronym: 'Adsds',
    //     state: stateEnabled,
    //     institution: institution2,
    //   },
    // );
    //
    // for (const item of institutions) {
    //   await this.institutionsService.create(item);
    // }
  }
}
