import { Injectable } from '@nestjs/common';
import { SeedCareerDto } from '@core/dto';
import { CareersService, CataloguesService, InstitutionsService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class CareersSeeder {
  constructor(private institutionsService: InstitutionsService, private cataloguesService: CataloguesService, private careersService: CareersService) {}

  async run() {
    await this.create();
  }

  private async create() {
    const careers: SeedCareerDto[] = [];

    const catalogues = (await this.cataloguesService.findAll()).data;

    const institutions = (await this.institutionsService.findAll()).data;

    const stateEnabled = catalogues.find(state => {
      return state.code === 'enabled' && state.type === CatalogueCoreTypeEnum.CAREERS_STATE;
    });
    const stateDisabled = catalogues.find(state => {
      return state.code === 'disabled' && state.type === CatalogueCoreTypeEnum.CAREERS_STATE;
    });

    const modality1 = catalogues.find(modality => {
      return modality.code === 'On-site' && modality.type === CatalogueCoreTypeEnum.CAREER_MODALITY;
    });
    const modality2 = catalogues.find(modality => {
      return modality.code === 'Distance' && modality.type === CatalogueCoreTypeEnum.CAREER_MODALITY;
    });
    const modality3 = catalogues.find(modality => {
      return modality.code === 'Double' && modality.type === CatalogueCoreTypeEnum.CAREER_MODALITY;
    });
    const modality4 = catalogues.find(modality => {
      return modality.code === 'Hybrid' && modality.type === CatalogueCoreTypeEnum.CAREER_MODALITY;
    });

    const type1 = catalogues.find(type => {
      return type.code === 'technology' && type.type === CatalogueCoreTypeEnum.CAREERS_TYPE;
    });
    const type2 = catalogues.find(type => {
      return type.code === 'technique' && type.type === CatalogueCoreTypeEnum.CAREERS_TYPE;
    });

    const institution1 = institutions.find(institution => institution.code === 'cod1');
    const institution2 = institutions.find(institution => institution.code === 'cod2');

    careers.push(
      {
        code: 'cod1',
        name: 'Ingeniería Eléctrica',
        acronym: 'IEE',
        state: stateDisabled,
        institution: institution1,
        modality: modality1,
        type: type1,
        codeSniese: '123456',
        degree: 'Ingeniero',
        isVisible: true,
        logo: 'logo',
        resolutionNumber: 'Res123',
        shortName: 'IE',
      },
      {
        code: 'cod2',
        name: 'Arquitectura',
        acronym: 'Arq',
        state: stateEnabled,
        institution: institution1,
        modality: modality2,
        type: type2,
        codeSniese: '789012',
        degree: 'Arquitecto',
        isVisible: true,
        logo: 'logo',
        resolutionNumber: 'Res456',
        shortName: 'Arq',
      },
      {
        code: 'cod3',
        name: 'Derecho',
        acronym: 'Der',
        state: stateEnabled,
        institution: institution2,
        modality: modality3,
        type: type1,
        codeSniese: '345678',
        degree: 'Abogado',
        isVisible: true,
        logo: 'logo',
        resolutionNumber: 'Res789',
        shortName: 'Der',
      },
      {
        code: 'cod4',
        name: 'Medicina',
        acronym: 'Med',
        state: stateEnabled,
        institution: institution2,
        modality: modality4,
        type: type2,
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
