import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CatalogueEntity, SchoolPeriodEntity, SubjectEntity, TeacherEntity } from '@core/entities';

@Entity('teacher_distributions', { schema: 'core' })
export class TeacherDistributionEntity {
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
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  /** Foreign Keys **/
  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'parallel_id' })
  parallel: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Paralelos asignados al profesor' })
  parallel_id: string;

  @ManyToOne(() => SchoolPeriodEntity)
  @JoinColumn({ name: 'school_period_id' })
  schoolPeriod: SchoolPeriodEntity;
  @Column({ type: 'uuid', comment: 'Periodo lectivo al que pertenece' })
  schoolPeriod_id: string;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;
  @Column({ type: 'uuid', comment: 'Asignaturas asignadas al profesor' })
  subject_id: string;

  @ManyToOne(() => TeacherEntity)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;
  @Column({ type: 'uuid', comment: 'Profesor asignado' })
  teacher_id: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'workday_id' })
  workday: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Jornada laboral del Profesor' })
  workday_id: string;

  /** Columns **/
  @Column({
    name: 'hours',
    type: 'int',
    nullable: true,
    comment: 'Horas de clase semanales',
  })
  hours: number;
}
