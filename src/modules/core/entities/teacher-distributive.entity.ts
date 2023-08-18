import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CatalogueEntity, SchoolPeriodEntity, SubjectEntity, TeacherEntity } from '@core/entities';

@Entity('teacher_distributives', { schema: 'core' })
export class TeacherDistributiveEntity {
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

  /** Relationship **/
  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'paralell_id' })
  paralell: CatalogueEntity;

  @ManyToOne(() => TeacherEntity)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ManyToOne(() => SchoolPeriodEntity)
  @JoinColumn({ name: 'school_period_id' })
  schoolPeriod: SchoolPeriodEntity;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'workday_id' })
  workday: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'hours',
    type: 'integer',
    nullable: true,
    comment: 'Horas de clase semanales',
  })
  hours: number;

}
