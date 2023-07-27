import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  CareerEntity,
  CatalogueEntity,
  CurriculumEntity,
  SchoolPeriodEntity,
  StudentEntity,
} from '@core/entities';

@Entity('enrollments', { schema: 'core' })
export class EnrollmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
    comment: 'Fecha de creacion del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
    comment: 'Fecha de actualizacion del registro',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminacion del registro',
  })
  deletedAt: Date;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'academic_period_id' })
  academicPeriod: CatalogueEntity;

  /** Relationship **/
  @ManyToOne(() => CurriculumEntity)
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: CurriculumEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'parallel_id' })
  parallel: CatalogueEntity;

  @ManyToOne(() => SchoolPeriodEntity)
  @JoinColumn({ name: 'school_period_id' })
  schoolPeriodEntity: SchoolPeriodEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @ManyToOne(() => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'workday_id' })
  workday: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'code',
    type: 'varchar',
    comment: 'Codigo de la matricula',
  })
  code: string;

  @Column({
    name: 'date',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de la matricula',
  })
  date: Date;

  @Column({
    name: 'applications_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de envio de solicitud',
  })
  applicationsAt: Date;

  @Column({
    name: 'folio',
    type: 'varchar',
    comment: 'Numero de folio',
  })
  folio: string;

  @Column({
    name: 'observation',
    type: 'text',
    comment: 'Observaciones de la matricula',
  })
  observation: string;
}
