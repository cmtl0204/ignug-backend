import { Injectable } from '@nestjs/common';
import { CataloguesService } from '@core/services';
import { CatalogueStateEnum, CatalogueCoreTypeEnum } from '@shared/enums';
import { CreateCatalogueDto } from '@core/dto';

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
    await this.createRegistrationTypeCatalogues();
    await this.createScholarshipReason1Catalogues();
    await this.createScholarshipReason2Catalogues();
    await this.createScholarshipReason3Catalogues();
    await this.createScholarshipReason4Catalogues();
    await this.createScholarshipReason5Catalogues();
    await this.createScholarshipReason6Catalogues();
    await this.createScholarshipTypeCatalogues();
    await this.createScholarshipFundingTypeCatalogues();
    await this.createSchoolDayCatalogues();
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
  }

  async createAcademicPeriodCatalogues(): Promise<void> {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Periodo academico',
      name: '1ro',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
    });
    catalogues.push({
      code: '2',
      description: 'Periodo academico',
      name: '2do',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
    });
    catalogues.push({
      code: '3',
      description: 'Periodo academico',
      name: '3ro',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
    });
    catalogues.push({
      code: '4',
      description: 'Periodo academico',
      name: '4to',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
    });
    catalogues.push({
      code: '5',
      description: 'Periodo academico',
      name: '5to',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
    });
    catalogues.push({
      code: '6',
      description: 'Periodo academico',
      name: '6to',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ACADEMIC_PERIOD,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createBloodTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'tipo de sangre',
      name: 'A+',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de sangre',
      name: 'A-',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'tipo de sangre',
      name: 'B+',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '4',
      description: 'tipo de sangre',
      name: 'B-',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '5',
      description: 'tipo de sangre',
      name: 'AB+',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '6',
      description: 'tipo de sangre',
      name: 'AB-',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '7',
      description: 'tipo de sangre',
      name: 'O+',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '8',
      description: 'tipo de sangre',
      name: 'O-',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.BLOOD_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createCareerModalityCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'On-site',
      description: 'Modalidad de carrera',
      name: 'Presencial',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CAREER_MODALITY,
    });
    catalogues.push({
      code: 'Blended',
      description: 'Modalidad de carrera',
      name: 'Semi-Presencial',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CAREER_MODALITY,
    });
    catalogues.push({
      code: 'Distance',
      description: 'Modalidad de carrera',
      name: 'Disntacia',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CAREER_MODALITY,
    });
    catalogues.push({
      code: 'Double',
      description: 'Modalidad de carrera',
      name: 'Dual',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CAREER_MODALITY,
    });
    catalogues.push({
      code: 'Online',
      description: 'Modalidad de carrera',
      name: 'Línea',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CAREER_MODALITY,
    });
    catalogues.push({
      code: 'Hybrid',
      description: 'Modalidad de carrera',
      name: 'Híbrida',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CAREER_MODALITY,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createDisabilityTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'tipo de discapacidad',
      name: 'Intelectual',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de discapacidad',
      name: 'Física',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'tipo de discapacidad',
      name: 'Visual',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '4',
      description: 'tipo de discapacidad',
      name: 'Auditiva',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '5',
      description: 'tipo de discapacidad',
      name: 'Mental',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '6',
      description: 'tipo de discapacidad',
      name: 'Otra',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '7',
      description: 'tipo de discapacidad',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.DISABILITY_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createEducationLevelCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Nivel de formación',
      name: 'Centro de Alfabetización',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '2',
      description: 'Nivel de formación',
      name: 'Jardín de infantes',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '3',
      description: 'Nivel de formación',
      name: 'Primaria',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '4',
      description: 'Nivel de formación',
      name: 'Educación Básica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '5',
      description: 'Nivel de formación',
      name: 'Secundaria',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '6',
      description: 'Nivel de formación',
      name: 'Educación Media',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '7',
      description: 'Nivel de formación',
      name: 'Superior no Universitaria',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '8',
      description: 'Nivel de formación',
      name: 'Superior Universitaria',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '9',
      description: 'Nivel de formación',
      name: 'Posgrado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '10',
      description: 'Nivel de formación',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.EDUCATION_LEVEL,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createEthnicOriginCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'etnia',
      name: 'Indígena',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de sangre',
      name: 'Afroecuatoriano',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '3',
      description: 'tipo de sangre',
      name: 'Negro',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '4',
      description: 'tipo de sangre',
      name: 'Mulato',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '5',
      description: 'tipo de sangre',
      name: 'Montuvio',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '6',
      description: 'tipo de sangre',
      name: 'Mestizo',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '7',
      description: 'tipo de sangre',
      name: 'Blanco',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '8',
      description: 'tipo de sangre',
      name: 'Otro',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '9',
      description: 'tipo de sangre',
      name: 'No registra',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ETHNIC_ORIGIN,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createIdentificationTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'tipo de identificacion',
      name: 'Cédula',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.IDENTIFICATION_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de identificacion',
      name: 'Pasaporte',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.IDENTIFICATION_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createInstitutionPracticesTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'tipo de institucion practicas',
      name: 'Pública',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de institucion practicas',
      name: 'Privada',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'tipo de institucion practicas',
      name: 'ONG',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE,
    });
    catalogues.push({
      code: '4',
      description: 'tipo de institucion practicas',
      name: 'Otro',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE,
    });
    catalogues.push({
      code: '5',
      description: 'tipo de institucion practicas',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createGenderCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'genero',
      name: 'Masculino',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.GENDER,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de identificacion',
      name: 'Femenino',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.GENDER,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createMaritalStatusCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'estado civil',
      name: 'Soltero/a',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.MARITAL_STATUS,
    });
    catalogues.push({
      code: '2',
      description: 'estado civil',
      name: 'Casado/a',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.MARITAL_STATUS,
    });
    catalogues.push({
      code: '3',
      description: 'estado civil',
      name: 'Divorciado/a',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.MARITAL_STATUS,
    });
    catalogues.push({
      code: '4',
      description: 'estado civil',
      name: 'Unión libre',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.MARITAL_STATUS,
    });
    catalogues.push({
      code: '5',
      description: 'estado civil',
      name: 'Viudo/a',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.MARITAL_STATUS,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createProjectScopeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Alcance del proyecto de vinculacion',
      name: 'Nacional',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.PROJECT_SCOPE,
    });
    catalogues.push({
      code: '2',
      description: 'Alcance del proyecto de vinculacion',
      name: 'Provincial',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.PROJECT_SCOPE,
    });
    catalogues.push({
      code: '3',
      description: 'Alcance del proyecto de vinculacion',
      name: 'Cantonal',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.PROJECT_SCOPE,
    });
    catalogues.push({
      code: '4',
      description: 'Alcance del proyecto de vinculacion',
      name: 'Parrolquial',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.PROJECT_SCOPE,
    });
    catalogues.push({
      code: '5',
      description: 'Alcance del proyecto de vinculacion',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.PROJECT_SCOPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createRegistrationTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Tipo de matricula',
      name: 'Ordinaria',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.REGISTRATION_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'Tipo de matricula',
      name: 'Extraordinaria',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.REGISTRATION_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'Tipo de matricula',
      name: 'Especial',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.REGISTRATION_TYPE,
    });
    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason1Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Primera razón de la beca',
      name: 'Socioeconómica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_1,
    });
    catalogues.push({
      code: '2',
      description: 'Primera razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_1,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason2Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Segunda razón de la beca',
      name: 'Excelencia Académica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_2,
    });
    catalogues.push({
      code: '2',
      description: 'Segunda razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_2,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason3Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Tercera razón de la beca',
      name: 'Deportista',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_3,
    });
    catalogues.push({
      code: '2',
      description: 'Tercera razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_3,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason4Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Cuarta razón de la beca',
      name: 'Pueblos y Nacionalidades',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_4,
    });
    catalogues.push({
      code: '2',
      description: 'Cuarta razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_4,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason5Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Quinta razón de la beca',
      name: 'Discapacidad',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_5,
    });
    catalogues.push({
      code: '2',
      description: 'Quinta razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_5,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason6Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Sexta razón de la beca',
      name: 'Otra',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_6,
    });
    catalogues.push({
      code: '2',
      description: 'Sexta razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_REASON_6,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Tipo de beca',
      name: 'Total',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'Tipo de beca',
      name: 'Parcial',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'Tipo de beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipFundingTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Tipo de financiamento de beca',
      name: 'Fondos propios',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'Tipo de financiamento de beca',
      name: 'Transferencia del Estado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'Tipo de financiamento de beca',
      name: 'Donaciones',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
    });
    catalogues.push({
      code: '4',
      description: 'Tipo de financiamento de beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createSchoolDayCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Jornada',
      name: 'Matutina',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_DAY,
    });
    catalogues.push({
      code: '2',
      description: 'Jornada',
      name: 'Vespertina',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_DAY,
    });
    catalogues.push({
      code: '3',
      description: 'Jornada',
      name: 'Nocturna',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_DAY,
    });
    catalogues.push({
      code: '4',
      description: 'Jornada',
      name: 'Intensiva',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_DAY,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createSchoolTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Tipo de colegio',
      name: 'Fiscal',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'Tipo de colegio',
      name: 'Fiscomisional',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'Tipo de colegio',
      name: 'Particular',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
    });
    catalogues.push({
      code: '4',
      description: 'Tipo de colegio',
      name: 'Minicipal',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
    });
    catalogues.push({
      code: '5',
      description: 'Tipo de colegio',
      name: 'Extranjero',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
    });
    catalogues.push({
      code: '6',
      description: 'Tipo de colegio',
      name: 'No registra',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createSexCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'sexo',
      name: 'Hombre',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SEX,
    });
    catalogues.push({
      code: '2',
      description: 'sexo',
      name: 'Mujer',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SEX,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createStudentIncomeForCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Para que emplea sus ingresos',
      name: 'Financiar sus estudios',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.STUDENT_INCOME_FOR,
    });
    catalogues.push({
      code: '2',
      description: 'Para que emplea sus ingresos',
      name: 'Para mantener a su hogar',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.STUDENT_INCOME_FOR,
    });
    catalogues.push({
      code: '3',
      description: 'Para que emplea sus ingresos',
      name: 'Gastos personales',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.STUDENT_INCOME_FOR,
    });
    catalogues.push({
      code: '4',
      description: 'Para que emplea sus ingresos',
      name: 'No aplica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.STUDENT_INCOME_FOR,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createStudentOccupationCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Ocupacion del estudiante',
      name: 'Solo estudia',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.STUDENT_OCCUPATION,
    });
    catalogues.push({
      code: '2',
      description: 'Ocupacion del estudiante',
      name: 'Trabaja y estudia',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.STUDENT_OCCUPATION,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createYesNoCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Si o No',
      name: 'Si',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.YES_NO,
    });
    catalogues.push({
      code: '2',
      description: 'Si o No',
      name: 'No',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.YES_NO,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createYesNoNACatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Si, No y No aplica',
      name: 'Si',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.YES_NO_NA,
    });
    catalogues.push({
      code: '2',
      description: 'Si, No y No aplica',
      name: 'No',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.YES_NO_NA,
    });
    catalogues.push({
      code: '3',
      description: 'Si, No y No aplica',
      name: 'No apliaca',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.YES_NO_NA,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createSchoolPeriodsStateCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'open',
      description: 'Periodo Lectivo Actual',
      name: 'ABIERTO',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_PERIODS_STATE,
    });

    catalogues.push({
      code: 'close',
      description: 'Periodo Lectivo Histórico',
      name: 'CERRADO',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SCHOOL_PERIODS_STATE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createInstitutionsStateCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'enable',
      description: 'Habilitado para escoger',
      name: 'Habilitado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.INSTITUTIONS_STATE,
    });

    catalogues.push({
      code: 'disable',
      description: 'Inhabilitado para escoger',
      name: 'Inhabilitado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.INSTITUTIONS_STATE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createCareersStateCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'enable',
      description: 'Habilitado para escoger',
      name: 'Habilitado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CAREERS_STATE,
    });

    catalogues.push({
      code: 'disable',
      description: 'Inhabilitado para escoger',
      name: 'Inhabilitado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CAREERS_STATE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createCareersTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'technology',
      description: 'Tecnología,Tecnicatura',
      name: 'Tecnología',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CAREERS_TYPE,
    });

    catalogues.push({
      code: 'technique',
      description: 'Tecnología,Tecnicatura',
      name: 'Tecnicatura',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CAREERS_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createCurriculumsStateCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'enable',
      description: 'Habilitado para escoger',
      name: 'Habilitado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CURRICULUMS_STATE,
    });

    catalogues.push({
      code: 'disable',
      description: 'Inhabilitado para escoger',
      name: 'Inhabilitado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.CURRICULUMS_STATE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createSubjectsStateCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'enable',
      description: 'Habilitado para escoger',
      name: 'Habilitado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SUBJECTS_STATE,
    });

    catalogues.push({
      code: 'disable',
      description: 'Inhabilitado para escoger',
      name: 'Inhabilitado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SUBJECTS_STATE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createSubjectsTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'subject',
      description: 'Asignatura',
      name: 'Asignatura',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SUBJECTS_TYPE,
    });

    catalogues.push({
      code: 'integrator_project',
      description: 'Proyecto Integrador',
      name: 'Proyecto Integrador',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SUBJECTS_TYPE,
    });

    catalogues.push({
      code: 'practical_phase',
      description: 'Fase Práctica',
      name: 'Fase Práctica',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.SUBJECTS_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createParallelsCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'a',
      description: 'A',
      name: 'A',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.PARALLEL,
    });

    catalogues.push({
      code: 'b',
      description: 'B',
      name: 'B',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.PARALLEL,
    });

    catalogues.push({
      code: 'c',
      description: 'C',
      name: 'C',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.PARALLEL,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createEnrollmentsTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'ordinary',
      description: 'Ordinaria',
      name: 'Ordinaria',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_TYPE,
    });

    catalogues.push({
      code: 'extraordinary',
      description: 'Extraordinary',
      name: 'Extraordinary',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_TYPE,
    });

    catalogues.push({
      code: 'especial',
      description: 'Especial',
      name: 'Especial',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createEnrollmentsAcademicStateCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'a',
      description: 'Aprobado',
      name: 'Aprobado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_ACADEMIC_STATE,
    });

    catalogues.push({
      code: 'r',
      description: 'Reprobado',
      name: 'Reprobado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_ACADEMIC_STATE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createEnrollmentsWorkdayCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'm',
      description: 'Matutina',
      name: 'Matutina',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY,
    });

    catalogues.push({
      code: 'v',
      description: 'Vespertina',
      name: 'Vespertina',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY,
    });

    catalogues.push({
      code: 'n',
      description: 'Nocturna',
      name: 'Nocturna',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY,
    });

    catalogues.push({
      code: 'i',
      description: 'Intensiva',
      name: 'Intensiva',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createEnrollmentsStateCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: 'registered',
      description: 'Matriculado',
      name: 'Matriculado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_STATE,
    });

    catalogues.push({
      code: 'unregistered',
      description: 'No Matriculado',
      name: 'No Matriculado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_STATE,
    });

    catalogues.push({
      code: 'accepted',
      description: 'Aceptado',
      name: 'Aceptado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_STATE,
    });

    catalogues.push({
      code: 'approved',
      description: 'Aprovado',
      name: 'Aprovado',
      state: CatalogueStateEnum.ENABLE,
      type: CatalogueCoreTypeEnum.ENROLLMENTS_STATE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }
}
