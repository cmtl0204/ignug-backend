import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@auth/entities';
import { InformationTeacherEntity } from '@core/entities';

@Entity('teachers', { schema: 'core' })
export class TeacherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    name: 'is_visible',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  isVisible: boolean;

  /** Inverse Relationship **/
  @OneToOne(() => InformationTeacherEntity)
  @JoinColumn({ name: 'teacher' })
  informationTeacher: InformationTeacherEntity;

  /** Relationship **/
  @OneToOne(() => UserEntity, (user) => user.teacher)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  /** Columns **/
  @Column({ name: 'name', type: 'varchar', comment: 'Nombre del estudiante' })
  name: string;
}
