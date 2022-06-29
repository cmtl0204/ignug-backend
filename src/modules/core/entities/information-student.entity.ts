import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentEntity } from '@core/entities';
import { CatalogueEntity } from '@core/entities';

@Entity('information_students')
export class InformationStudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CatalogueEntity)
  isBonusDevelopmentReceive: CatalogueEntity; //fk
  @ManyToOne(
    () => CatalogueEntity,
    (catalogue) => catalogue.isAncestralLanguage,
  )
  isAncestralLanguage: CatalogueEntity; //fk
  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.isDegreeSuperior)
  isDegreeSuperior: CatalogueEntity; //fk
  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.isDisability)
  isDisability: CatalogueEntity; //fk
  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.isSubjectRepeat)
  isSubjectRepeat: CatalogueEntity; //fk
  @Column('varchar', {
    name: 'address',
    length: 1000,
    comment: 'La direccion donde reside el estudiante',
  })
  address: string;

  @Column('varchar', {
    name: 'ancestral_language',
    length: 255,
    comment: 'El idioma ancestral que el estudiante maneja',
  })
  ancestralLanguage: string;

  @Column('varchar', {
    name: 'cell_phone',
    length: 10,
    comment: 'Numero de celular del estudiante',
  })
  cellPhone: string;

  @Column('varchar', {
    name: 'codanis_number',
    length: 10,
    comment: 'Numero que tiene el carnet del conais',
  })
  codanisNumber: string;

  @Column('integer', {
    name: 'community',
    comment:
      'Las horas realizadas por parte del estudiante en integracion con la sociedad',
  })
  community: number;

  @Column('varchar', {
    name: 'company_name',
    length: 255,
    comment: 'El nombre de la compania donde el estudiante trabaja',
  })
  companyName: string;

  @Column('varchar', {
    name: 'contact_emergency_name',
    length: 255,
    comment:
      'Nombre del contacto de emergencia para informar sobre el estudiante',
  })
  contactEmergencyName: string;

  @Column('varchar', {
    name: 'contact_emergency_kinship',
    length: 255,
    comment:
      'Nombre del contacto de emergencia de parentescos para informar sobre el estudiante',
  })
  contactEmergencyKinship: string;

  @Column('varchar', {
    name: 'contact_emergency_phone',
    length: 255,
    comment:
      'Numeros de contacto de emergencia para informar sobre el estudiante',
  })
  contactEmergencyPhone: string;

  @Column('varchar', {
    name: 'degree_obtained_superior',
    length: 10,
    comment: 'obtuvo su grado superior si=1 , no= 2',
  })
  degreeObtainedSuperior: string;

  @Column('varchar', {
    name: 'disability_type',
    length: 100,
    comment: 'Tipo de discapcidad que tiene el estudiante',
  })
  disabilityType: string;

  @Column('integer', {
    name: 'disability_percentage',
    comment: 'El porcentaje de discapicidad que tiene el estudiante ',
  })
  disabilityPercentage: number;

  @Column('varchar', {
    name: 'education_level_mother',
    length: 100,
    comment:
      'Nivel de formacion de ecuacion que tiene la madre 1 = Basico , 2 = Superior',
  })
  educationLevelMother: string;

  @Column('varchar', {
    name: 'education_level_father',
    length: 100,
    comment:
      'Nivel de formacion de ecuacion que tiene la padre 1 = Basico , 2 = Superior',
  })
  educationLevelFather: string;

  @Column('integer', {
    name: 'economic_amount',
    comment: 'El monto de ayuda economica que el estudiante recibe',
  })
  economicAmount: number;

  @Column('integer', {
    name: 'educational_amount',
    comment: 'El monto de credito que el estudiante tiene',
  })
  educationalAmount: number;

  @Column('varchar', {
    name: 'economic_practice_sector',
    length: 20,
    comment: 'Sector economico que hizo las practicas el estudiante',
  })
  economicPracticeSector: string;

  @Column('integer', {
    name: 'family_income',
    comment: 'La direccion donde reside el estudiante',
  })
  familyIncome: number;

  @Column('varchar', {
    name: 'financing_scholarship_type',
    length: 180,
    comment: 'recibi el estudiante un financiamiento si =1, no = 2',
  })
  financingScholarshipType: string;

  @Column('varchar', {
    name: 'institution_practice_type',
    length: 100,
    comment: 'La institucion que hizo las practicas el estudiante',
  })
  institutionPracticeType: string;

  @Column('varchar', {
    name: 'is_lost_gratuity',
    length: 1,
    comment: 'Si el estudiante ah perdido la gratuidad en el instituto',
  })
  isLostGratuity: string;

  @Column('varchar', {
    name: 'is_executed_practice',
    length: 1,
    comment: 'Si el estudiante ah realizado practicas = 1  , si no realizo = 2',
  })
  isExecutedPractice: string;

  @Column('varchar', {
    name: 'is_executed_community',
    length: 1,
    comment:
      'Si el estudiante ah realizado integracion con la sociedad = 1  , si no realizo = 2',
  })
  isExecutedCommunity: string;

  @Column('integer', {
    name: 'members_house_number',
    comment: 'Numero de familiares con quien vive el estudiante',
  })
  membersHouseNumber: number;

  @Column('varchar', {
    name: 'ocupation',
    length: 280,
    comment: ' ocupacion de la compañia donde el estudiante trabaja',
  })
  ocupation: string;

  @Column('varchar', {
    name: 'phone',
    length: 10,
    comment: 'Numero de telefono del estudiante',
  })
  phone: string;

  @Column('integer', {
    name: 'practice_hours',
    comment: 'Las horas realizadas por parte del estudiante en pasantias',
  })
  practiceHours: number;

  @Column('varchar', {
    name: 'postal_code',
    length: 100,
    comment: 'Codigo postal donde el estudiante reside',
  })
  postalCode: string;

  @Column('integer', {
    name: 'scholarship_amount',
    comment: 'El monto de beca que el estudiante obtuvo',
  })
  scholarshipAmount: number;

  @Column('varchar', {
    name: 'scholarship_reason1',
    length: 255,
    comment: 'Razon para que el estudiante pida una beca',
  })
  scholarshipReason1: string;

  @Column('varchar', {
    name: 'scholarship_reason2',
    length: 255,
    comment: 'Razon para que el estudiante pida una beca',
  })
  scholarshipReason2: string;

  @Column('varchar', {
    name: 'scholarship_reason3',
    length: 255,
    comment: 'Razon para que el estudiante pida una beca',
  })
  scholarshipReason3: string;

  @Column('varchar', {
    name: 'scholarship_reason4',
    length: 255,
    comment: 'Razon para que el estudiante pida una beca',
  })
  scholarshipReason4: string;

  @Column('varchar', {
    name: 'scholarship_reason5',
    length: 255,
    comment: 'Razon para que el estudiante pida una beca',
  })
  scholarshipReason5: string;

  @Column('varchar', {
    name: 'scholarship_reason6',
    length: 255,
    comment: 'Razon para que el estudiante pida una beca',
  })
  scholarshipReason6: string;

  @Column('varchar', {
    name: 'scholarship_type',
    length: 255,
    comment: 'Tipo de beca del estudiante ',
  })
  scholarshipType: string;

  @Column('integer', {
    name: 'tariff_scholarship_percentage',
    comment: 'El porcentaje de beca que cubre la institutcion el estudiante ',
  })
  tariffScholarshipPercentage: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  /*
    @OneToOne(() => StudentEntity, (student) => student.information_student)
    @JoinColumn({name:'migratory_id'})
    student: StudentEntity;
  */
}
