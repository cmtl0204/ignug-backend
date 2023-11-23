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

        const institution1 = institutions.find((institution: InstitutionEntity) => institution.code === '1068');

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
            {
                code: '650321H01-H-1701',
                name: 'COMUNICACION COMUNITARIA Y NUEVAS TECNOLOGIAS DE LA COMUNICACION',
                degree: 'Licenciado/a en Comunicación',
                acronym: 'CCNT',
                codeSniese: '1068-650321H01-H-1701',
                resolutionNumber: 'RPC-SO-19-No.310-2023',
                shortName: 'COMUNICACIÓN',
                state: stateEnabled,
                institution: institution1,
                modality: modality1,
                type: type1,
                isVisible: true,
                logo: 'logo',
            },
            {
                code: '650331C01-S-1701',
                name: 'DERECHO CON ENFOQUE DE PLURALISMO JURIDICO',
                degree: 'Abogado/a con Enfoque de Pluralismo Jurídico',
                acronym: 'DEPJ',
                codeSniese: '650331C01-S-1701',
                resolutionNumber: 'RPC-SO-06-No.177-2021',
                shortName: 'DERECHO',
                state: stateEnabled,
                institution: institution1,
                modality: modality1,
                type: type1,
                isVisible: true,
                logo: 'logo',
            },
            {
                code: '650311D01-H-1701',
                name: 'ECONOMIA SOCIAL, SOLIDARIA Y COMUNITARIA',
                degree: 'Licenciado/a en Economía Social, Solidaria y Comunitaria',
                acronym: 'ESSC',
                codeSniese: '1068-650311D01-H-1701',
                resolutionNumber: 'RPC-SO-19-No.310-2023',
                shortName: 'ECONOMIA ',
                state: stateEnabled,
                institution: institution1,
                modality: modality1,
                type: type1,
                isVisible: true,
                logo: 'logo',
            },
            {
                code: '650112B01-S-1701',
                name: 'GESTION DEL DESARROLLO INFANTIL FAMILIAR COMUNITARIO',
                degree: 'Licenciado/a en Gestión del Desarrollo Infantil Familiar Comunitario',
                acronym: 'GDIFC',
                codeSniese: '650112B01-S-1701',
                resolutionNumber: 'RPC-SO-06-No.182-2021',
                shortName: 'GESTION',
                state: stateEnabled,
                institution: institution1,
                modality: modality1,
                type: type1,
                isVisible: true,
                logo: 'logo',
            },
            {
                code: '650314H01-S-1701',
                name: 'LENGUA Y CULTURA',
                degree: 'Licenciado/a en Lengua y Cultura',
                acronym: 'LYC',
                codeSniese: '650314H01-S-1702',
                resolutionNumber: 'RPC-SO-06-No.177-2021',
                shortName: 'LENGUA ',
                state: stateEnabled,
                institution: institution1,
                modality: modality1,
                type: type1,
                isVisible: true,
                logo: 'logo',
            },
            {
                code: '650314H01-H-1701',
                name: 'SABERES ANCESTRALES EN ALIMENTACION INTERCULTURAL Y COMUNITARIA',
                degree: 'Licenciado/a en Saberes Ancestrales en Alimentación Intercultural y Comunitaria',
                acronym: 'SAAIC',
                codeSniese: '1068-650314H01-H-1701',
                resolutionNumber: 'RPC-SO-29-No.479-2023',
                shortName: 'SABERES',
                state: stateEnabled,
                institution: institution1,
                modality: modality1,
                type: type1,
                isVisible: true,
                logo: 'logo',
            },
            {
                code: '651015D01-H-1701',
                name: 'TURISMO RURAL, SOSTENIBLE E INTERCULTURAL',
                degree: 'Licenciado/a en Turismo Rural, Sostenible E Intercultural',
                acronym: 'TRSI',
                codeSniese: '651015D01-H-1701',
                resolutionNumber: 'RPC-SO-06-No.127-2023',
                shortName: 'TURISMO ',
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
