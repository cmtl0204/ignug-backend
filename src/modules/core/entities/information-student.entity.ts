import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CatalogueEntity, StudentEntity } from '@core/entities';

@Entity('information_students', { schema: 'core' })
export class InformationStudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  /** Foreign Keys **/
  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_executed_community' })
  isExecutedCommunity: CatalogueEntity;
  @Column({ type: 'uuid', nullable: true, comment: 'Realizo trabajo comunitario' })
  is_executed_community_id: string;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_executed_practice' })
  isExecutedPractice: CatalogueEntity;
  @Column({ type: 'uuid', nullable: true, comment: 'Realizo practicas preprofesionales' })
  is_executed_practice_id: string;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_disability' })
  isDisability: CatalogueEntity;
  @Column({ type: 'uuid', nullable: true, comment: 'Tiene disacapasidad' })
  is_disability_id: string;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_lost_Gratuity' })
  isLostGratuity: CatalogueEntity;
  @Column({ type: 'uuid', nullable: true, comment: 'Perdida de gratuidad' })
  is_lost_gratuity_id: string;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_subject_repeat' })
  isSubjectRepeat: CatalogueEntity;
  @Column({ type: 'uuid', nullable: true, comment: 'Repite materias' })
  is_subject_repeat_id: string;

  @OneToOne(() => StudentEntity, student => student.informationStudent)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;
  @Column({ type: 'uuid', comment: 'Estudiante que pertenece la informacion' })
  student_id: string;

  /** Columns **/
  @Column({
    name: 'address',
    type: 'text',
    nullable: true,
    comment: 'La direccion donde reside el estudiante',
  })
  address: string;

  @Column({
    name: 'community',
    type: 'int',
    nullable: true,
    comment: 'Las horas realizadas por parte del estudiante en integracion con la sociedad',
  })
  community: number;

  @Column({
    name: 'contact_emergency_name',
    type: 'varchar',
    nullable: true,
    comment: 'Nombre del contacto de emergencia para informar sobre el estudiante',
  })
  contactEmergencyName: string;

  @Column({
    name: 'contact_emergency_kinship',
    type: 'varchar',
    nullable: true,
    comment: 'Nombre del contacto de emergencia de parentescos para informar sobre el estudiante',
  })
  contactEmergencyKinship: string;

  @Column({
    name: 'contact_emergency_phone',
    type: 'varchar',
    nullable: true,
    comment: 'Numeros de contacto de emergencia para informar sobre el estudiante',
  })
  contactEmergencyPhone: string;

  @Column({
    name: 'disability_percentage',
    type: 'float',
    nullable: true,
    comment: 'El porcentaje de discapicidad que tiene el estudiante ',
  })
  disabilityPercentage: number;

  @Column({
    name: 'economic_amount',
    type: 'float',
    nullable: true,
    comment: 'El monto de ayuda economica que el estudiante recibe',
  })
  economicAmount: number;

  @Column({
    name: 'educational_amount',
    type: 'float',
    nullable: true,
    comment: 'El monto de credito que el estudiante tiene',
  })
  educationalAmount: number;

  @Column({
    name: 'family_income',
    type: 'float',
    nullable: true,
    comment: 'La direccion donde reside el estudiante',
  })
  familyIncome: number;

  @Column({
    name: 'financing_scholarship_type',
    type: 'varchar',
    nullable: true,
    comment: 'Recibe el estudiante un financiamiento si =1, no = 2',
  })
  financingScholarshipType: string;

  @Column({
    name: 'members_house_number',
    type: 'int',
    nullable: true,
    comment: 'Numero de familiares con quien vive el estudiante',
  })
  membersHouseNumber: number;

  @Column({
    name: 'practice_hours',
    type: 'int',
    nullable: true,
    comment: 'Las horas realizadas por parte del estudiante en pasantias',
  })
  practiceHours: number;

  @Column({
    name: 'postal_code',
    type: 'varchar',
    nullable: true,
    comment: 'Codigo postal donde el estudiante reside',
  })
  postalCode: string;

  @Column({
    name: 'scholarship_amount',
    type: 'float',
    nullable: true,
    comment: 'El monto de beca que el estudiante obtuvo',
  })
  scholarshipAmount: number;

  @Column({
    name: 'tariff_scholarship_percentage',
    type: 'float',
    nullable: true,
    comment: 'El porcentaje de beca que cubre la institutcion el estudiante ',
  })
  tariffScholarshipPercentage: number;
}
