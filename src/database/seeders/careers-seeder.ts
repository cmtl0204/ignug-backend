import {Injectable} from '@nestjs/common';
import {SeedCareerDto} from '@core/dto';
import {CareersService, CataloguesService, InstitutionsService} from '@core/services';
import {CatalogueCareersModalityEnum, CatalogueTypeEnum} from '@shared/enums';
import {CareerEntity, CatalogueEntity, CareerAcademicPeriodsEntity, InstitutionEntity} from '@core/entities';

@Injectable()
export class CareersSeeder {
    constructor(private institutionsService: InstitutionsService, private cataloguesService: CataloguesService, private careersService: CareersService) {
    }

    async run() {
        await this.create();
    }

    private async create() {
        const careers: SeedCareerDto[] = [];

        const catalogues = await this.cataloguesService.findCache();

        const institutions = (await this.institutionsService.findAll()).data;

        const stateEnabled = catalogues.find((state: CatalogueEntity) => {
            return state.code === 'enabled' && state.type === CatalogueTypeEnum.CAREERS_STATE;
        });
        const stateDisabled = catalogues.find((state: CatalogueEntity) => {
            return state.code === 'disabled' && state.type === CatalogueTypeEnum.CAREERS_STATE;
        });

        const modality1 = catalogues.find((modality: CatalogueEntity) => {
            return modality.code === CatalogueCareersModalityEnum.ON_SITE && modality.type === CatalogueTypeEnum.CAREER_MODALITY;
        });
        const modality2 = catalogues.find((modality: CatalogueEntity) => {
            return modality.code === CatalogueCareersModalityEnum.DISTANCE && modality.type === CatalogueTypeEnum.CAREER_MODALITY;
        });
        const modality3 = catalogues.find((modality: CatalogueEntity) => {
            return modality.code === CatalogueCareersModalityEnum.DUAL && modality.type === CatalogueTypeEnum.CAREER_MODALITY;
        });
        const modality4 = catalogues.find((modality: CatalogueEntity) => {
            return modality.code === CatalogueCareersModalityEnum.HYBRID && modality.type === CatalogueTypeEnum.CAREER_MODALITY;
        });

        const type1 = catalogues.find((type: CatalogueEntity) => {
            return type.code === 'technology' && type.type === CatalogueTypeEnum.CAREERS_TYPE;
        });
        const type2 = catalogues.find((type: CatalogueEntity) => {
            return type.code === 'technique' && type.type === CatalogueTypeEnum.CAREERS_TYPE;
        });

        const institution1 = institutions.find((institution: InstitutionEntity) => institution.code === 'cod1');
        const institution2 = institutions.find((institution: InstitutionEntity) => institution.code === 'cod2');

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

// review
    private async createAcademicPeriods() {
        const careers = (await this.careersService.findAll()).data;
        const catalogues = await this.cataloguesService.findCache();
        const academicPeriods = catalogues.filter(academicPeriod => academicPeriod.type === CatalogueTypeEnum.ACADEMIC_PERIOD);
        const careerAcademicPeriods: any[] = [];

        for (const career of careers) {
            for (const catalogue of academicPeriods) {
                careerAcademicPeriods.push({career, catalogue});
            }
        }

        for (const item of careers) {
            await this.careersService.create(item);
        }
    }
}
