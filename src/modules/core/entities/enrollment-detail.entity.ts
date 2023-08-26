import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
  @OneToMany(() => GradeEntity, grade => grade.enrollmentDetail, { eager: true })
  grades: GradeEntity[];

  /** Foreign Keys **/

  @ManyToOne(() => CatalogueEntity, { eager: true })
  @JoinColumn({ name: 'academic_state_id' })
  academicState: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Aprobado o Desaprobado' })
  academic_state_id: string;

  @ManyToOne(() => EnrollmentEntity, { eager: true })
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: EnrollmentEntity;
  @Column({ type: 'uuid', comment: 'Matriculado o No Matriculado' })
  enrollment_id: string;

  @ManyToOne(() => CatalogueEntity, { eager: true })
  @JoinColumn({ name: 'parallel_id' })
  parallel: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Paralelo asignado' })
  parallel_id: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Habilitado o Inhabilitado' })
  state_id: string;

  @ManyToOne(() => SubjectEntity, { eager: true })
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;
  @Column({ type: 'uuid', comment: 'Asignaturas asignadas' })
  subject_id: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Intensiva' })
  type_id: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'workday_id' })
  workday: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Jornada laboral' })
  workday_id: string;

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
