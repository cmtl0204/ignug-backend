import {Injectable} from '@nestjs/common';
import {CreateCatalogueDto} from '@core/dto';
import {CataloguesService} from '@core/services';
import {CatalogueStateEnum, CatalogueTypeEnum, CatalogueCareersModalityEnum} from '@shared/enums';

@Injectable()
export class CataloguesSeeder {
    constructor(private catalogueService: CataloguesService) {
    }

    async run() {
        await this.createAcademicPeriodCatalogues();
        await this.createBloodTypeCatalogues();
        await this.createCareerModalityCatalogues();
        await this.createDisabilityTypeCatalogues();
        await this.createEducationLevelCatalogues();
        await this.createEthnicOriginCatalogues();
        await this.createIdentificationTypeCatalogues();
        await this.createInstitutionPracticesTypeCatalogues();
        await this.createGenderCatalogues();
        await this.createMaritalStatusCatalogues();
        await this.createProjectScopeCatalogues();
        await this.createScholarshipReasonCatalogues();
        await this.createScholarshipTypeCatalogues();
        await this.createScholarshipFundingTypeCatalogues();
        await this.createSchoolTypeCatalogues();
        await this.createSexCatalogues();
        await this.createStudentIncomeForCatalogues();
        await this.createStudentOccupationCatalogues();
        await this.createYesNoCatalogues();
        await this.createYesNoNACatalogues();
        await this.createSchoolPeriodsStateCatalogues();
        await this.createInstitutionsStateCatalogues();
        await this.createCareersStateCatalogues();
        await this.createCareersTypeCatalogues();
        await this.createCurriculumsStateCatalogues();
        await this.createSubjectsStateCatalogues();
        await this.createSubjectsTypeCatalogues();
        await this.createParallelsCatalogues();
        await this.createEnrollmentsTypeCatalogues();
        await this.createEnrollmentsAcademicStateCatalogues();
        await this.createEnrollmentsWorkdayCatalogues();
        await this.createEnrollmentsStateCatalogues();
        await this.createClassroomsStateCatalogues();
        await this.createClassroomsTypeCatalogues();
        await this.createStudentLiveCatalogues();
        await this.createHomeOwnershipCatalogues();
        await this.createHomeTypeCatalogues();
        await this.createHomeRoofCatalogues();
        await this.createHomeFloorCatalogues();
        await this.createHomeWallCatalogues();
        await this.createFamilyIncomeCatalogues();
    }

    private async createAcademicPeriodCatalogues(): Promise<void> {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'pre',
                description: 'Pre',
                name: 'Pre',
                sort: 0,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
            {
                code: '1',
                description: 'Periodo academico',
                name: 'Primero',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
            {
                code: '2',
                description: 'Periodo academico',
                name: 'Segundo',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
            {
                code: '3',
                description: 'Periodo academico',
                name: 'Tercero',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
            {
                code: '4',
                description: 'Periodo academico',
                name: 'Cuarto',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
            {
                code: '5',
                description: 'Periodo academico',
                name: 'Quinto',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
            {
                code: '6',
                description: 'Periodo academico',
                name: 'Sexto',
                sort: 6,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
            {
                code: '7',
                description: 'Periodo academico',
                name: 'Séptimo',
                sort: 7,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
            {
                code: '8',
                description: 'Periodo academico',
                name: 'Octavo',
                sort: 8,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
            {
                code: '9',
                description: 'Periodo academico',
                name: 'Noveno',
                sort: 9,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
            {
                code: '10',
                description: 'Periodo academico',
                name: 'Décimo',
                sort: 10,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ACADEMIC_PERIOD,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createBloodTypeCatalogues(): Promise<void> {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'a+',
                description: 'tipo de sangre',
                name: 'A+',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.BLOOD_TYPE,
            },
            {
                code: 'a-',
                description: 'tipo de sangre',
                name: 'A-',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.BLOOD_TYPE,
            },
            {
                code: 'b+',
                description: 'tipo de sangre',
                name: 'B+',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.BLOOD_TYPE,
            },
            {
                code: 'b-',
                description: 'tipo de sangre',
                name: 'B-',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.BLOOD_TYPE,
            },
            {
                code: 'ab+',
                description: 'tipo de sangre',
                name: 'AB+',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.BLOOD_TYPE,
            },
            {
                code: 'ab-',
                description: 'tipo de sangre',
                name: 'AB-',
                sort: 6,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.BLOOD_TYPE,
            },
            {
                code: 'o+',
                description: 'tipo de sangre',
                name: 'O+',
                sort: 7,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.BLOOD_TYPE,
            },
            {
                code: 'o-',
                description: 'tipo de sangre',
                name: 'O-',
                sort: 8,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.BLOOD_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createCareerModalityCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: CatalogueCareersModalityEnum.ON_SITE,
                description: 'Modalidad de carrera',
                name: 'Presencial',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CAREER_MODALITY,
            },
            {
                code: CatalogueCareersModalityEnum.SEMI_ON_SITE,
                description: 'Modalidad de carrera',
                name: 'Semi-Presencial',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CAREER_MODALITY,
            },
            {
                code: CatalogueCareersModalityEnum.DISTANCE,
                description: 'Modalidad de carrera',
                name: 'Distancia',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CAREER_MODALITY,
            },
            {
                code: CatalogueCareersModalityEnum.DUAL,
                description: 'Modalidad de carrera',
                name: 'Dual',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CAREER_MODALITY,
            },
            {
                code: CatalogueCareersModalityEnum.ONLINE,
                description: 'Modalidad de carrera',
                name: 'Línea',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CAREER_MODALITY,
            },
            {
                code: CatalogueCareersModalityEnum.HYBRID,
                description: 'Modalidad de carrera',
                name: 'Híbrida',
                sort: 6,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CAREER_MODALITY,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createDisabilityTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'tipo de discapacidad',
                name: 'Intelectual',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.DISABILITY_TYPE,
            },
            {
                code: '2',
                description: 'tipo de discapacidad',
                name: 'Física',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.DISABILITY_TYPE,
            },
            {
                code: '3',
                description: 'tipo de discapacidad',
                name: 'Visual',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.DISABILITY_TYPE,
            },
            {
                code: '4',
                description: 'tipo de discapacidad',
                name: 'Auditiva',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.DISABILITY_TYPE,
            },
            {
                code: '5',
                description: 'tipo de discapacidad',
                name: 'Mental',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.DISABILITY_TYPE,
            },
            {
                code: '6',
                description: 'tipo de discapacidad',
                name: 'Otra',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.DISABILITY_TYPE,
            },
            {
                code: '7',
                description: 'tipo de discapacidad',
                name: 'No aplica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.DISABILITY_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createEducationLevelCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'Nivel de formación',
                name: 'Centro de Alfabetización',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.EDUCATION_LEVEL,
            },
            {
                code: '2',
                description: 'Nivel de formación',
                name: 'Jardín de infantes',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.EDUCATION_LEVEL,
            },
            {
                code: '3',
                description: 'Nivel de formación',
                name: 'Primaria',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.EDUCATION_LEVEL,
            },
            {
                code: '4',
                description: 'Nivel de formación',
                name: 'Educación Básica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.EDUCATION_LEVEL,
            },
            {
                code: '5',
                description: 'Nivel de formación',
                name: 'Secundaria',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.EDUCATION_LEVEL,
            },
            {
                code: '6',
                description: 'Nivel de formación',
                name: 'Educación Media',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.EDUCATION_LEVEL,
            },
            {
                code: '7',
                description: 'Nivel de formación',
                name: 'Superior no Universitaria',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.EDUCATION_LEVEL,
            },
            {
                code: '8',
                description: 'Nivel de formación',
                name: 'Superior Universitaria',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.EDUCATION_LEVEL,
            },
            {
                code: '9',
                description: 'Nivel de formación',
                name: 'Posgrado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.EDUCATION_LEVEL,
            },
            {
                code: '10',
                description: 'Nivel de formación',
                name: 'No aplica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.EDUCATION_LEVEL,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createEthnicOriginCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'etnia',
                name: 'Indígena',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ETHNIC_ORIGIN,
            },
            {
                code: '2',
                description: 'tipo de sangre',
                name: 'Afroecuatoriano',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ETHNIC_ORIGIN,
            },
            {
                code: '3',
                description: 'tipo de sangre',
                name: 'Negro',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ETHNIC_ORIGIN,
            },
            {
                code: '4',
                description: 'tipo de sangre',
                name: 'Mulato',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ETHNIC_ORIGIN,
            },
            {
                code: '5',
                description: 'tipo de sangre',
                name: 'Montuvio',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ETHNIC_ORIGIN,
            },
            {
                code: '6',
                description: 'tipo de sangre',
                name: 'Mestizo',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ETHNIC_ORIGIN,
            },
            {
                code: '7',
                description: 'tipo de sangre',
                name: 'Blanco',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ETHNIC_ORIGIN,
            },
            {
                code: '8',
                description: 'tipo de sangre',
                name: 'Otro',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ETHNIC_ORIGIN,
            },
            {
                code: '9',
                description: 'tipo de sangre',
                name: 'No registra',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ETHNIC_ORIGIN,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createIdentificationTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'tipo de identificacion',
                name: 'Cédula',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.IDENTIFICATION_TYPE,
            },
            {
                code: '2',
                description: 'tipo de identificacion',
                name: 'Pasaporte',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.IDENTIFICATION_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createInstitutionPracticesTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'tipo de institucion practicas',
                name: 'Pública',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.INSTITUTION_PRACTICES_TYPE,
            },
            {
                code: '2',
                description: 'tipo de institucion practicas',
                name: 'Privada',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.INSTITUTION_PRACTICES_TYPE,
            },
            {
                code: '3',
                description: 'tipo de institucion practicas',
                name: 'ONG',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.INSTITUTION_PRACTICES_TYPE,
            },
            {
                code: '4',
                description: 'tipo de institucion practicas',
                name: 'Otro',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.INSTITUTION_PRACTICES_TYPE,
            },
            {
                code: '5',
                description: 'tipo de institucion practicas',
                name: 'No aplica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.INSTITUTION_PRACTICES_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createGenderCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'genero',
                name: 'Masculino',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.GENDER,
            },
            {
                code: '2',
                description: 'tipo de identificacion',
                name: 'Femenino',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.GENDER,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createMaritalStatusCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'estado civil',
                name: 'Soltero/a',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.MARITAL_STATUS,
            },
            {
                code: '2',
                description: 'estado civil',
                name: 'Casado/a',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.MARITAL_STATUS,
            },
            {
                code: '3',
                description: 'estado civil',
                name: 'Divorciado/a',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.MARITAL_STATUS,
            },
            {
                code: '4',
                description: 'estado civil',
                name: 'Unión libre',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.MARITAL_STATUS,
            },
            {
                code: '5',
                description: 'estado civil',
                name: 'Viudo/a',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.MARITAL_STATUS,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createProjectScopeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'Alcance del proyecto de vinculacion',
                name: 'Nacional',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PROJECT_SCOPE,
            },
            {
                code: '2',
                description: 'Alcance del proyecto de vinculacion',
                name: 'Provincial',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PROJECT_SCOPE,
            },
            {
                code: '3',
                description: 'Alcance del proyecto de vinculacion',
                name: 'Cantonal',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PROJECT_SCOPE,
            },
            {
                code: '4',
                description: 'Alcance del proyecto de vinculacion',
                name: 'Parrolquial',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PROJECT_SCOPE,
            },
            {
                code: '5',
                description: 'Alcance del proyecto de vinculacion',
                name: 'No aplica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PROJECT_SCOPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createScholarshipReasonCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'Primera razón de la beca',
                name: 'Socioeconómica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_REASON,
            },
            {
                code: '2',
                description: 'Segunda razón de la beca',
                name: 'Excelencia Académica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_REASON,
            },
            {
                code: '3',
                description: 'Tercera razón de la beca',
                name: 'Deportista',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_REASON,
            },

            {
                code: '4',
                description: 'Cuarta razón de la beca',
                name: 'Pueblos y Nacionalidades',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_REASON,
            },
            {
                code: '5',
                description: 'Quinta razón de la beca',
                name: 'Discapacidad',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_REASON,
            },
            {
                code: '6',
                description: 'Sexta razón de la beca',
                name: 'Otra',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_REASON,
            },
            {
                code: '0',
                description: 'Sexta razón de la beca',
                name: 'No aplica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_REASON,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createScholarshipTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'total',
                description: 'Tipo de beca',
                name: 'Total',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_TYPE,
            },
            {
                code: 'partial',
                description: 'Tipo de beca',
                name: 'Parcial',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_TYPE,
            },
            {
                code: 'na',
                description: 'Tipo de beca',
                name: 'No aplica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createScholarshipFundingTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'Tipo de financiamento de beca',
                name: 'Fondos propios',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
            },
            {
                code: '2',
                description: 'Tipo de financiamento de beca',
                name: 'Transferencia del Estado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
            },
            {
                code: '3',
                description: 'Tipo de financiamento de beca',
                name: 'Donaciones',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
            },
            {
                code: '4',
                description: 'Tipo de financiamento de beca',
                name: 'No aplica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createSchoolTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'Tipo de colegio',
                name: 'Fiscal',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOOL_TYPE,
            },
            {
                code: '2',
                description: 'Tipo de colegio',
                name: 'Fiscomisional',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOOL_TYPE,
            },
            {
                code: '3',
                description: 'Tipo de colegio',
                name: 'Particular',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOOL_TYPE,
            },
            {
                code: '4',
                description: 'Tipo de colegio',
                name: 'Minicipal',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOOL_TYPE,
            },
            {
                code: '5',
                description: 'Tipo de colegio',
                name: 'Extranjero',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOOL_TYPE,
            },
            {
                code: '6',
                description: 'Tipo de colegio',
                name: 'No registra',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOOL_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createSexCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'sexo',
                name: 'Hombre',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SEX,
            },
            {
                code: '2',
                description: 'sexo',
                name: 'Mujer',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SEX,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createStudentIncomeForCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'Para que emplea sus ingresos',
                name: 'Financiar sus estudios',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_INCOME_FOR,
            },
            {
                code: '2',
                description: 'Para que emplea sus ingresos',
                name: 'Para mantener a su hogar',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_INCOME_FOR,
            },
            {
                code: '3',
                description: 'Para que emplea sus ingresos',
                name: 'Gastos personales',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_INCOME_FOR,
            },
            {
                code: '4',
                description: 'Para que emplea sus ingresos',
                name: 'No aplica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_INCOME_FOR,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createStudentOccupationCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'Ocupacion del estudiante',
                name: 'Solo estudia',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_OCCUPATION,
            },
            {
                code: '2',
                description: 'Ocupacion del estudiante',
                name: 'Trabaja y estudia',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_OCCUPATION,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createYesNoCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'Si o No',
                name: 'Si',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.YES_NO,
            },
            {
                code: '2',
                description: 'Si o No',
                name: 'No',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.YES_NO,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createYesNoNACatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: 'Si, No y No aplica',
                name: 'Si',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.YES_NO_NA,
            },
            {
                code: '2',
                description: 'Si, No y No aplica',
                name: 'No',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.YES_NO_NA,
            },
            {
                code: '3',
                description: 'Si, No y No aplica',
                name: 'No apliaca',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.YES_NO_NA,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createSchoolPeriodsStateCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'open',
                description: 'Periodo Lectivo Actual',
                name: 'ABIERTO',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOOL_PERIODS_STATE,
            },
            {
                code: 'close',
                description: 'Periodo Lectivo Histórico',
                name: 'CERRADO',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SCHOOL_PERIODS_STATE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createInstitutionsStateCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'enabled',
                description: 'Habilitado para escoger',
                name: 'Habilitado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.INSTITUTIONS_STATE,
            },
            {
                code: 'disabled',
                description: 'Inhabilitado para escoger',
                name: 'Inhabilitado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.INSTITUTIONS_STATE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createCareersStateCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'enabled',
                description: 'Habilitado para escoger',
                name: 'Habilitado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CAREERS_STATE,
            },
            {
                code: 'disabled',
                description: 'Inhabilitado para escoger',
                name: 'Inhabilitado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CAREERS_STATE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createCareersTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'technology',
                description: 'Tecnología,Tecnicatura',
                name: 'Tecnología',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CAREERS_TYPE,
            },
            {
                code: 'technique',
                description: 'Tecnología,Tecnicatura',
                name: 'Tecnicatura',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CAREERS_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createCurriculumsStateCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'enabled',
                description: 'Habilitado para escoger',
                name: 'Habilitado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CURRICULUMS_STATE,
            },
            {
                code: 'disabled',
                description: 'Inhabilitado para escoger',
                name: 'Inhabilitado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CURRICULUMS_STATE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createSubjectsStateCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'enabled',
                description: 'Habilitado para escoger',
                name: 'Habilitado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SUBJECTS_STATE,
            },
            {
                code: 'disabled',
                description: 'Inhabilitado para escoger',
                name: 'Inhabilitado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SUBJECTS_STATE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createSubjectsTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'subject',
                description: 'Asignatura',
                name: 'Asignatura',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SUBJECTS_TYPE,
            },
            {
                code: 'integrator_project',
                description: 'Proyecto Integrador',
                name: 'Proyecto Integrador',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SUBJECTS_TYPE,
            },
            {
                code: 'practical_phase',
                description: 'Fase Práctica',
                name: 'Fase Práctica',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.SUBJECTS_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createParallelsCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'a',
                description: 'A',
                name: 'A',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PARALLEL,
            },
            {
                code: 'b',
                description: 'B',
                name: 'B',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PARALLEL,
            },
            {
                code: 'c',
                description: 'C',
                name: 'C',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PARALLEL,
            },
            {
                code: 'd',
                description: 'D',
                name: 'D',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PARALLEL,
            },
            {
                code: 'e',
                description: 'E',
                name: 'E',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PARALLEL,
            },
            {
                code: 'f',
                description: 'F',
                name: 'F',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.PARALLEL,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createEnrollmentsTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'ordinary',
                description: 'Ordinaria',
                name: 'Ordinaria',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_TYPE,
            },
            {
                code: 'extraordinary',
                description: 'Extraordinary',
                name: 'Extraordinary',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_TYPE,
            },
            {
                code: 'especial',
                description: 'Especial',
                name: 'Especial',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createEnrollmentsAcademicStateCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'a',
                description: 'Aprobado',
                name: 'Aprobado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_ACADEMIC_STATE,
            },
            {
                code: 'r',
                description: 'Reprobado',
                name: 'Reprobado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_ACADEMIC_STATE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createEnrollmentsWorkdayCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'm',
                description: 'Matutina',
                name: 'Matutina',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_WORKDAY,
            },
            {
                code: 'v',
                description: 'Vespertina',
                name: 'Vespertina',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_WORKDAY,
            },
            {
                code: 'n',
                description: 'Nocturna',
                name: 'Nocturna',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_WORKDAY,
            },
            {
                code: 'i',
                description: 'Intensiva',
                name: 'Intensiva',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_WORKDAY,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createEnrollmentsStateCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'request_sent',
                description: 'Solicitud Enviada',
                name: 'Solicitud Enviada',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_STATE,
            },
            {
                code: 'approved',
                description: 'Aprobado',
                name: 'Aprobado',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_STATE,
            },
            {
                code: 'rejected',
                description: 'Rechazado',
                name: 'Rechzado',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_STATE,
            },
            {
                code: 'enrolled',
                description: 'Matriculado',
                name: 'Matriculado',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_STATE,
            },
            {
                code: 'revoked',
                description: 'Anulado',
                name: 'Anulado',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_STATE,
            },
            {
                code: 'paid',
                description: 'Pagado',
                name: 'Pagado',
                sort: 6,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_STATE,
            },
            {
                code: 'registered',
                description: 'Inscrito',
                name: 'Inscrito',
                sort: 7,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.ENROLLMENTS_STATE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createClassroomsStateCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'enabled',
                description: 'Habilitado',
                name: 'Habilitado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CLASSROOMS_STATE,
            },
            {
                code: 'disabled',
                description: 'Inhabilitado',
                name: 'Inhabilitado',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CLASSROOMS_STATE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createClassroomsTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'classroom',
                description: 'Aula',
                name: 'Aula',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CLASSROOMS_TYPE,
            },
            {
                code: 'laboratory',
                description: 'Laboratorio',
                name: 'Laboratorio',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CLASSROOMS_TYPE,
            },
            {
                code: 'workshop',
                description: 'Taller',
                name: 'Taller',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.CLASSROOMS_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createStudentLiveCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'alone',
                description: 'Solo',
                name: 'Solo',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_LIVE,
            },
            {
                code: 'both_parents',
                description: 'Ambos Padres',
                name: 'Ambos Padres',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_LIVE,
            },
            {
                code: 'mother',
                description: 'Madre',
                name: 'Madre',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_LIVE,
            },
            {
                code: 'father',
                description: 'Padre',
                name: 'Padre',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_LIVE,
            },
            {
                code: 'spouse',
                description: 'Cónygue / Conviviente',
                name: 'Cónygue / Conviviente',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_LIVE,
            },
            {
                code: 'grandparents',
                description: 'Abuelos',
                name: 'Abuelos',
                sort: 6,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_LIVE,
            },
            {
                code: 'other',
                description: 'Otro',
                name: 'Otro',
                sort: 7,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.STUDENT_LIVE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createHomeOwnershipCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'paid',
                description: 'Propia, Pagada',
                name: 'Propia, Pagada',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_OWNERSHIP,
            },
            {
                code: 'mortgaged',
                description: 'Propia, Hipotecada',
                name: 'Propia, Hipotecada',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_OWNERSHIP,
            },
            {
                code: 'rented',
                description: 'Arrendada',
                name: 'Arrendada',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_OWNERSHIP,
            },
            {
                code: 'family',
                description: 'De un Familiar',
                name: 'De un Familiar',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_OWNERSHIP,
            },
            {
                code: 'shared',
                description: 'Compartida',
                name: 'Compartida',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_OWNERSHIP,
            },
            {
                code: 'other',
                description: 'Otro',
                name: 'Otro',
                sort: 6,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_OWNERSHIP,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createHomeTypeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'house',
                description: 'Casa / Villa',
                name: 'Casa / Villa',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_TYPE,
            },
            {
                code: 'department',
                description: 'Departamento',
                name: 'Departamento',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_TYPE,
            },
            {
                code: 'hut',
                description: 'Choza / Covacha',
                name: 'Choza / Covacha',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_TYPE,
            },
            {
                code: 'mediagua',
                description: 'Mediagua',
                name: 'Mediagua',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_TYPE,
            },
            {
                code: 'ranch',
                description: 'Rancho',
                name: 'Rancho',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_TYPE,
            },
            {
                code: 'room',
                description: 'Cuarto',
                name: 'Cuarto',
                sort: 6,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_TYPE,
            },
            {
                code: 'other',
                description: 'Otro',
                name: 'Otro',
                sort: 7,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_TYPE,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createHomeRoofCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'zinc',
                description: 'Zinc',
                name: 'Zinc',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_ROOF,
            },
            {
                code: 'tile',
                description: 'Teja',
                name: 'Teja',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_ROOF,
            },
            {
                code: 'ternit',
                description: 'Eternit',
                name: 'eternit',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_ROOF,
            },
            {
                code: 'concrete',
                description: 'Hormigón',
                name: 'Hormigón',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_ROOF,
            },
            {
                code: 'other',
                description: 'Otro',
                name: 'Otro',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_ROOF,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createHomeFloorCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'ceramic',
                description: 'Cerámica / Baldosa',
                name: 'Cerámica / Baldosa',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_FLOOR,
            },
            {
                code: 'wood',
                description: 'Madera',
                name: 'Madera',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_FLOOR,
            },
            {
                code: 'cement',
                description: 'Cemento',
                name: 'Cemento',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_FLOOR,
            },
            {
                code: 'land',
                description: 'Tierra',
                name: 'Tierra',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_FLOOR,
            },
            {
                code: 'other',
                description: 'Otro',
                name: 'Otro',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_FLOOR,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createHomeWallCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: 'concrete',
                description: 'Hormigón',
                name: 'Hormigón',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_WALL,
            },
            {
                code: 'brick',
                description: 'Ladrillo',
                name: 'Ladrillo',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_WALL,
            },
            {
                code: 'wood',
                description: 'Madera',
                name: 'Madera',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_WALL,
            },
            {
                code: 'adobe',
                description: 'Adobe',
                name: 'Adobe',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_WALL,
            },
            {
                code: 'cane',
                description: 'Caña',
                name: 'Caña',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_WALL,
            },
            {
                code: 'other',
                description: 'Otro',
                name: 'Otro',
                sort: 6,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.HOME_WALL,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }

    private async createFamilyIncomeCatalogues() {
        const catalogues: CreateCatalogueDto[] = [];
        catalogues.push(
            {
                code: '1',
                description: '0-50 dólares',
                name: '0-50 dólares',
                sort: 1,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.FAMILY_INCOME,
            },
            {
                code: '2',
                description: '51-200 dólares',
                name: '51-200 dólares',
                sort: 2,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.FAMILY_INCOME,
            },
            {
                code: '3',
                description: '201-400 dólares',
                name: '201-400 dólares',
                sort: 3,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.FAMILY_INCOME,
            },
            {
                code: '4',
                description: '401-800 dólares',
                name: '401-800 dólares',
                sort: 4,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.FAMILY_INCOME,
            },
            {
                code: '5',
                description: '801-1000 dólares',
                name: '801-1000 dólares',
                sort: 5,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.FAMILY_INCOME,
            },
            {
                code: '6',
                description: '1001-2000 dólares',
                name: '1001-2000 dólares',
                sort: 6,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.FAMILY_INCOME,
            },
            {
                code: '7',
                description: '2001-en adelante',
                name: '2001-en adelante',
                sort: 7,
                state: CatalogueStateEnum.ENABLED,
                type: CatalogueTypeEnum.FAMILY_INCOME,
            },
        );

        for (const catalogue of catalogues) {
            await this.catalogueService.create(catalogue);
        }
    }
}
