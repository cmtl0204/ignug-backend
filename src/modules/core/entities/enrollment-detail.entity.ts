import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity, EnrollmentEntity, GradeEntity, SubjectEntity } from '@core/entities';

@Entity('enrollment_details', { schema: 'core' })
export class EnrollmentDetailEntity {
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

  /** Inverse Relationship **/
  @OneToMany(() => GradeEntity, grade => grade.enrollmentDetail)
  grades: GradeEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'academic_state_id' })
  academicState: CatalogueEntity;

  @ManyToOne(() => EnrollmentEntity)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: EnrollmentEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'parallel_id' })
  parallel: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'workday_id' })
  workday: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'number',
    type: 'varchar',
    comment: 'Numero de matricula',
  })
  number: number;

  @Column({
    name: 'date',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de la matricula',
  })
  date: Date;

  @Column({
    name: 'final_attendance',
    type: 'decimal',
    precision: 5,
    scale: 2,
    comment: 'Valor de la asistencia',
  })
  finalAttendance: number;

  @Column({
    name: 'final_grade',
    type: 'decimal',
    precision: 5,
    scale: 2,
    comment: 'Valor de la calificacion',
  })
  finalGrade: number;

  @Column({
    name: 'observation',
    type: 'text',
    comment: 'Observaciones de la matricula',
  })
  observation: string;
}
