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

  /** Foreign Keys **/
  @ManyToOne(() => PartialEntity)
  @JoinColumn({ name: 'partial_id' })
  partial: PartialEntity;

  @ManyToOne(() => TeacherDistributiveEntity)
  @JoinColumn({ name: 'teacher_distributive_id' })
  teacherDistributive: TeacherDistributiveEntity;

  /** Columns **/
  @Column({
    name: 'is_enabled',
    type: 'boolean',
    comment: 'Permiso',
  })
  isEnabled: boolean;
}
