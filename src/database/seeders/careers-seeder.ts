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

        const modality1 = catalogues.find((modality: CatalogueEntity) => {
            return modality.code === CatalogueCareersModalityEnum.SEMI_ON_SITE && modality.type === CatalogueTypeEnum.CAREER_MODALITY;
        });

        const type1 = catalogues.find((type: CatalogueEntity) => {
            return type.code === 'level_3' && type.type === CatalogueTypeEnum.CAREERS_TYPE;
        });

        const institution1 = institutions.find((institution: InstitutionEntity) => institution.code === 'cod1');

        careers.push(
            {
                code: '650811G01-S-1701',
                name: 'AGROECOLOGÍA Y SOBERANÍA ALIMENTARIA',
                degree: 'Ingeniero/a en Agroecología y soberanía alimentaria',
                acronym: 'AYSA',
                codeSniese: '650811G01-S-1701',
                resolutionNumber: 'RPC-SO-32-No.731-2021',
                shortName: 'AGROECOLOGIA',
                state: stateEnabled,
                institution: institution1,
                modality: modality1,
                type: type1,
                isVisible: true,
                logo: 'logo',
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
