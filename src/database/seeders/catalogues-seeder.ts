import { Injectable } from '@nestjs/common';
import { CreateCatalogueDto } from '@core/dto';
import { CataloguesService } from '@core/services';
import { CatalogueStateEnum, CatalogueCoreTypeEnum, CatalogueCareersModalityEnum } from '@shared/enums';

@Injectable()
export class CataloguesSeeder {
  constructor(private catalogueService: CataloguesService) {}

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
  }

  private async createAcademicPeriodCatalogues(): Promise<void> {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push(
      {
        code: '1',
        description: 'Periodo academico',
        name: 'Primero',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
      },
      {
        code: '2',
        description: 'Periodo academico',
        name: 'Segundo',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
      },
      {
        code: '3',
        description: 'Periodo academico',
        name: 'Tercero',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
      },
      {
        code: '4',
        description: 'Periodo academico',
        name: 'Cuarto',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
      },
      {
        code: '5',
        description: 'Periodo academico',
        name: 'Quinto',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
      },
      {
        code: '6',
        description: 'Periodo academico',
        name: 'Sexto',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
      },
      {
        code: '7',
        description: 'Periodo academico',
        name: 'Séptimo',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
      },
      {
        code: '8',
        description: 'Periodo academico',
        name: 'Octavo',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
      },
      {
        code: '9',
        description: 'Periodo academico',
        name: 'Noveno',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
      },
      {
        code: '10',
        description: 'Periodo academico',
        name: 'Décimo',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.BLOOD_TYPE,
      },
      {
        code: 'a-',
        description: 'tipo de sangre',
        name: 'A-',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.BLOOD_TYPE,
      },
      {
        code: 'b+',
        description: 'tipo de sangre',
        name: 'B+',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.BLOOD_TYPE,
      },
      {
        code: 'b-',
        description: 'tipo de sangre',
        name: 'B-',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.BLOOD_TYPE,
      },
      {
        code: 'ab+',
        description: 'tipo de sangre',
        name: 'AB+',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.BLOOD_TYPE,
      },
      {
        code: 'ab-',
        description: 'tipo de sangre',
        name: 'AB-',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.BLOOD_TYPE,
      },
      {
        code: 'o+',
        description: 'tipo de sangre',
        name: 'O+',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.BLOOD_TYPE,
      },
      {
        code: 'o-',
        description: 'tipo de sangre',
        name: 'O-',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.BLOOD_TYPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CAREER_MODALITY,
      },
      {
        code: CatalogueCareersModalityEnum.SEMI_ON_SITE,
        description: 'Modalidad de carrera',
        name: 'Semi-Presencial',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CAREER_MODALITY,
      },
      {
        code: CatalogueCareersModalityEnum.DISTANCE,
        description: 'Modalidad de carrera',
        name: 'Distancia',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CAREER_MODALITY,
      },
      {
        code: CatalogueCareersModalityEnum.DUAL,
        description: 'Modalidad de carrera',
        name: 'Dual',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CAREER_MODALITY,
      },
      {
        code: CatalogueCareersModalityEnum.ONLINE,
        description: 'Modalidad de carrera',
        name: 'Línea',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CAREER_MODALITY,
      },
      {
        code: CatalogueCareersModalityEnum.HYBRID,
        description: 'Modalidad de carrera',
        name: 'Híbrida',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CAREER_MODALITY,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
      },
      {
        code: '2',
        description: 'tipo de discapacidad',
        name: 'Física',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
      },
      {
        code: '3',
        description: 'tipo de discapacidad',
        name: 'Visual',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
      },
      {
        code: '4',
        description: 'tipo de discapacidad',
        name: 'Auditiva',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
      },
      {
        code: '5',
        description: 'tipo de discapacidad',
        name: 'Mental',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
      },
      {
        code: '6',
        description: 'tipo de discapacidad',
        name: 'Otra',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
      },
      {
        code: '7',
        description: 'tipo de discapacidad',
        name: 'No aplica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
      },
      {
        code: '2',
        description: 'Nivel de formación',
        name: 'Jardín de infantes',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
      },
      {
        code: '3',
        description: 'Nivel de formación',
        name: 'Primaria',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
      },
      {
        code: '4',
        description: 'Nivel de formación',
        name: 'Educación Básica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
      },
      {
        code: '5',
        description: 'Nivel de formación',
        name: 'Secundaria',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
      },
      {
        code: '6',
        description: 'Nivel de formación',
        name: 'Educación Media',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
      },
      {
        code: '7',
        description: 'Nivel de formación',
        name: 'Superior no Universitaria',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
      },
      {
        code: '8',
        description: 'Nivel de formación',
        name: 'Superior Universitaria',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
      },
      {
        code: '9',
        description: 'Nivel de formación',
        name: 'Posgrado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
      },
      {
        code: '10',
        description: 'Nivel de formación',
        name: 'No aplica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
      },
      {
        code: '2',
        description: 'tipo de sangre',
        name: 'Afroecuatoriano',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
      },
      {
        code: '3',
        description: 'tipo de sangre',
        name: 'Negro',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
      },
      {
        code: '4',
        description: 'tipo de sangre',
        name: 'Mulato',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
      },
      {
        code: '5',
        description: 'tipo de sangre',
        name: 'Montuvio',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
      },
      {
        code: '6',
        description: 'tipo de sangre',
        name: 'Mestizo',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
      },
      {
        code: '7',
        description: 'tipo de sangre',
        name: 'Blanco',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
      },
      {
        code: '8',
        description: 'tipo de sangre',
        name: 'Otro',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
      },
      {
        code: '9',
        description: 'tipo de sangre',
        name: 'No registra',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.IDENTIFICATION_TYPE,
      },
      {
        code: '2',
        description: 'tipo de identificacion',
        name: 'Pasaporte',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.IDENTIFICATION_TYPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE,
      },
      {
        code: '2',
        description: 'tipo de institucion practicas',
        name: 'Privada',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE,
      },
      {
        code: '3',
        description: 'tipo de institucion practicas',
        name: 'ONG',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE,
      },
      {
        code: '4',
        description: 'tipo de institucion practicas',
        name: 'Otro',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE,
      },
      {
        code: '5',
        description: 'tipo de institucion practicas',
        name: 'No aplica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.GENDER,
      },
      {
        code: '2',
        description: 'tipo de identificacion',
        name: 'Femenino',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.GENDER,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.MARITAL_STATUS,
      },
      {
        code: '2',
        description: 'estado civil',
        name: 'Casado/a',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.MARITAL_STATUS,
      },
      {
        code: '3',
        description: 'estado civil',
        name: 'Divorciado/a',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.MARITAL_STATUS,
      },
      {
        code: '4',
        description: 'estado civil',
        name: 'Unión libre',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.MARITAL_STATUS,
      },
      {
        code: '5',
        description: 'estado civil',
        name: 'Viudo/a',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.MARITAL_STATUS,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PROJECT_SCOPE,
      },
      {
        code: '2',
        description: 'Alcance del proyecto de vinculacion',
        name: 'Provincial',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PROJECT_SCOPE,
      },
      {
        code: '3',
        description: 'Alcance del proyecto de vinculacion',
        name: 'Cantonal',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PROJECT_SCOPE,
      },
      {
        code: '4',
        description: 'Alcance del proyecto de vinculacion',
        name: 'Parrolquial',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PROJECT_SCOPE,
      },
      {
        code: '5',
        description: 'Alcance del proyecto de vinculacion',
        name: 'No aplica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PROJECT_SCOPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON,
      },
      {
        code: '2',
        description: 'Segunda razón de la beca',
        name: 'Excelencia Académica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON,
      },
      {
        code: '3',
        description: 'Tercera razón de la beca',
        name: 'Deportista',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON,
      },

      {
        code: '4',
        description: 'Cuarta razón de la beca',
        name: 'Pueblos y Nacionalidades',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON,
      },
      {
        code: '5',
        description: 'Quinta razón de la beca',
        name: 'Discapacidad',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON,
      },
      {
        code: '6',
        description: 'Sexta razón de la beca',
        name: 'Otra',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON,
      },
      {
        code: '0',
        description: 'Sexta razón de la beca',
        name: 'No aplica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_TYPE,
      },
      {
        code: 'partial',
        description: 'Tipo de beca',
        name: 'Parcial',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_TYPE,
      },
      {
        code: 'na',
        description: 'Tipo de beca',
        name: 'No aplica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_TYPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
      },
      {
        code: '2',
        description: 'Tipo de financiamento de beca',
        name: 'Transferencia del Estado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
      },
      {
        code: '3',
        description: 'Tipo de financiamento de beca',
        name: 'Donaciones',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
      },
      {
        code: '4',
        description: 'Tipo de financiamento de beca',
        name: 'No aplica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
      },
      {
        code: '2',
        description: 'Tipo de colegio',
        name: 'Fiscomisional',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
      },
      {
        code: '3',
        description: 'Tipo de colegio',
        name: 'Particular',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
      },
      {
        code: '4',
        description: 'Tipo de colegio',
        name: 'Minicipal',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
      },
      {
        code: '5',
        description: 'Tipo de colegio',
        name: 'Extranjero',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
      },
      {
        code: '6',
        description: 'Tipo de colegio',
        name: 'No registra',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SEX,
      },
      {
        code: '2',
        description: 'sexo',
        name: 'Mujer',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SEX,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.STUDENT_INCOME_FOR,
      },
      {
        code: '2',
        description: 'Para que emplea sus ingresos',
        name: 'Para mantener a su hogar',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.STUDENT_INCOME_FOR,
      },
      {
        code: '3',
        description: 'Para que emplea sus ingresos',
        name: 'Gastos personales',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.STUDENT_INCOME_FOR,
      },
      {
        code: '4',
        description: 'Para que emplea sus ingresos',
        name: 'No aplica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.STUDENT_INCOME_FOR,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.STUDENT_OCCUPATION,
      },
      {
        code: '2',
        description: 'Ocupacion del estudiante',
        name: 'Trabaja y estudia',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.STUDENT_OCCUPATION,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.YES_NO,
      },
      {
        code: '2',
        description: 'Si o No',
        name: 'No',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.YES_NO,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.YES_NO_NA,
      },
      {
        code: '2',
        description: 'Si, No y No aplica',
        name: 'No',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.YES_NO_NA,
      },
      {
        code: '3',
        description: 'Si, No y No aplica',
        name: 'No apliaca',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.YES_NO_NA,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOOL_PERIODS_STATE,
      },
      {
        code: 'close',
        description: 'Periodo Lectivo Histórico',
        name: 'CERRADO',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SCHOOL_PERIODS_STATE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.INSTITUTIONS_STATE,
      },
      {
        code: 'disabled',
        description: 'Inhabilitado para escoger',
        name: 'Inhabilitado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.INSTITUTIONS_STATE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CAREERS_STATE,
      },
      {
        code: 'disabled',
        description: 'Inhabilitado para escoger',
        name: 'Inhabilitado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CAREERS_STATE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CAREERS_TYPE,
      },
      {
        code: 'technique',
        description: 'Tecnología,Tecnicatura',
        name: 'Tecnicatura',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CAREERS_TYPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CURRICULUMS_STATE,
      },
      {
        code: 'disabled',
        description: 'Inhabilitado para escoger',
        name: 'Inhabilitado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CURRICULUMS_STATE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SUBJECTS_STATE,
      },
      {
        code: 'disabled',
        description: 'Inhabilitado para escoger',
        name: 'Inhabilitado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SUBJECTS_STATE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SUBJECTS_TYPE,
      },
      {
        code: 'integrator_project',
        description: 'Proyecto Integrador',
        name: 'Proyecto Integrador',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SUBJECTS_TYPE,
      },
      {
        code: 'practical_phase',
        description: 'Fase Práctica',
        name: 'Fase Práctica',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.SUBJECTS_TYPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PARALLEL,
      },
      {
        code: 'b',
        description: 'B',
        name: 'B',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PARALLEL,
      },
      {
        code: 'c',
        description: 'C',
        name: 'C',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PARALLEL,
      },
      {
        code: 'd',
        description: 'D',
        name: 'D',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PARALLEL,
      },
      {
        code: 'e',
        description: 'E',
        name: 'E',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PARALLEL,
      },
      {
        code: 'f',
        description: 'F',
        name: 'F',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.PARALLEL,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_TYPE,
      },
      {
        code: 'extraordinary',
        description: 'Extraordinary',
        name: 'Extraordinary',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_TYPE,
      },
      {
        code: 'especial',
        description: 'Especial',
        name: 'Especial',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_TYPE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_ACADEMIC_STATE,
      },
      {
        code: 'r',
        description: 'Reprobado',
        name: 'Reprobado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_ACADEMIC_STATE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY,
      },
      {
        code: 'v',
        description: 'Vespertina',
        name: 'Vespertina',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY,
      },
      {
        code: 'n',
        description: 'Nocturna',
        name: 'Nocturna',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY,
      },
      {
        code: 'i',
        description: 'Intensiva',
        name: 'Intensiva',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY,
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
        code: 'registered',
        description: 'Matriculado',
        name: 'Matriculado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_STATE,
      },
      {
        code: 'unregistered',
        description: 'No Matriculado',
        name: 'No Matriculado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_STATE,
      },
      {
        code: 'accepted',
        description: 'Aceptado',
        name: 'Aceptado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_STATE,
      },
      {
        code: 'approved',
        description: 'Aprovado',
        name: 'Aprovado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.ENROLLMENTS_STATE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CLASSROOMS_STATE,
      },
      {
        code: 'disabled',
        description: 'Inhabilitado',
        name: 'Inhabilitado',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CLASSROOMS_STATE,
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
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CLASSROOMS_TYPE,
      },
      {
        code: 'laboratory',
        description: 'Laboratorio',
        name: 'Laboratorio',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CLASSROOMS_TYPE,
      },
      {
        code: 'workshop',
        description: 'Taller',
        name: 'Taller',
        state: CatalogueStateEnum.ENABLED,
        type: CatalogueCoreTypeEnum.CLASSROOMS_TYPE,
      },
    );

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }
}
