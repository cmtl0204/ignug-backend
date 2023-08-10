import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TeacherDistributiveEntity, PartialEntity } from '@core/entities';

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

  /** Relationship **/
  @ManyToOne(() => TeacherDistributiveEntity)
  @JoinColumn({ name: 'distributive_teacher_id' })
  teacherDistributive: TeacherDistributiveEntity;

  @ManyToOne(() => PartialEntity)
  @JoinColumn({ name: 'partial_id' })
  partial: PartialEntity;

  /** Columns **/
  @Column({
    name: 'is_enabled',
    type: 'boolean',
    comment: 'Permiso',
  })
  isEnabled: boolean;
}
