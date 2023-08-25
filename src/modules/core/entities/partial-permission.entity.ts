import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TeacherDistributionEntity, PartialEntity, SchoolPeriodEntity } from '@core/entities';

@Entity('partial_permission', { schema: 'core' })
export class PartialPermissionEntity {
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
  @ManyToOne(() => PartialEntity)
  @JoinColumn({ name: 'partial_id' })
  partial: PartialEntity;
  @Column({ type: 'uuid', comment: 'Parcial al que pertenece' })
  partial_id: string;

  @ManyToOne(() => SchoolPeriodEntity)
  @JoinColumn({ name: 'school_period_id' })
  schoolPeriod: SchoolPeriodEntity;
  @Column({ type: 'uuid', comment: 'Periodo lectivo al que pertenece' })
  schoolPeriod_id: string;

  @ManyToOne(() => TeacherDistributionEntity)
  @JoinColumn({ name: 'teacher_distribution_id' })
  teacherDistribution: TeacherDistributionEntity;
  @Column({ type: 'uuid', comment: 'Distribución de profesores' })
  teacherDistribution_id: string;

  /** Columns **/
  @Column({
    name: 'is_enabled',
    type: 'boolean',
    comment: 'Permiso',
  })
  isEnabled: boolean;
}
