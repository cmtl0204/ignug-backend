import { Injectable } from '@nestjs/common';
import { CreateCareerDto } from '@core/dto';
import { CareersService, CataloguesService, InstitutionsService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class CareersSeeder {
  constructor(private institutionsService: InstitutionsService, private cataloguesService: CataloguesService, private careersService: CareersService) {}

  async run() {
    await this.create();
  }

  async create() {
    const careers: CreateCareerDto[] = [];

    const catalogues = (await this.cataloguesService.findAll()).data;
    const institutions = (await this.institutionsService.findAll()).data;

    const stateEnabled = catalogues.find(state => {
      return state.code === 'enable' && state.type === CatalogueCoreTypeEnum.CAREERS_STATE;
    });

    const stateDisabled = catalogues.find(state => {
      return state.code === 'disable' && state.type === CatalogueCoreTypeEnum.CAREERS_STATE;
    });

    const modality1 = catalogues.find(modality => {
      return modality.code === '1' && modality.type === CatalogueCoreTypeEnum.CAREER_MODALITY;
    });

    const institution1 = institutions.find(institution => institution.code === 'ist1');
    const institution2 = institutions.find(institution => institution.code === 'ist2');

    careers.push(
      {
        code: 'eng1',
        name: 'Ingeniería Eléctrica',
        acronym: 'IEE',
        state: stateDisabled,
        institution: institution1,
        modality: modality1,
        type: null, // pendiente
        codeSniese: '123456',
        degree: 'Ingeniero',
        isVisible: true,
        logo: 'logo',
        resolutionNumber: 'Res123',
        shortName: 'IE',
      },
      {
        code: 'arch1',
        name: 'Arquitectura',
        acronym: 'Arq',
        state: stateEnabled,
        institution: institution1,
        modality: modality1,
        type: null, // pendiente
        codeSniese: '789012',
        degree: 'Arquitecto',
        isVisible: true,
        logo: 'logo',
        resolutionNumber: 'Res456',
        shortName: 'Arq',
      },
      {
        code: 'law1',
        name: 'Derecho',
        acronym: 'Der',
        state: stateEnabled,
        institution: institution2,
        modality: modality1,
        type: null, // Agrega el valor apropiado
        codeSniese: '345678',
        degree: 'Abogado',
        isVisible: true,
        logo: 'logo',
        resolutionNumber: 'Res789',
        shortName: 'Der',
      },
      {
        code: 'med1',
        name: 'Medicina',
        acronym: 'Med',
        state: stateEnabled,
        institution: institution2,
        modality: modality1,
        type: null, // pendiente
        codeSniese: '901234',
        degree: 'Médico',
        isVisible: true,
        logo: 'logo',
        resolutionNumber: 'Res012',
        shortName: 'Med',
      },
    );

    for (const item of careers) {
      await this.careersService.create(item);
    }
  }
}
