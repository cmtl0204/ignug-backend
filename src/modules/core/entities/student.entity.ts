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
import { InformationStudentEntity } from '@core/entities';

@Entity('students', { schema: 'core' })
export class StudentEntity {
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

  @Column({
    name: 'is_visible',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  isVisible: boolean;

  /** Inverse Relationship **/
  @OneToOne(() => InformationStudentEntity)
  @JoinColumn({ name: 'student' })
  informationStudent: InformationStudentEntity;

  /** Relationship **/
  @OneToOne(() => UserEntity, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  /** Columns **/
}
