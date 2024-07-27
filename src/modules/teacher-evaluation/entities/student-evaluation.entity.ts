import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {TeacherDistributionEntity } from '@core/entities';
import { UserEntity } from '@auth/entities';

@Entity('student-evaluations', { schema: 'teacher_evaluation' })
export class StudentEvaluationEntity {
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

  /** Foreign Keys **/
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @Column({ type: 'uuid', name: 'user_id', comment: 'FK' })
  userId: string;

  @ManyToOne(() => TeacherDistributionEntity)
  @JoinColumn({ name: 'teacher_distribution_id' })
  teacherDistribution: TeacherDistributionEntity;
  @Column({ type: 'uuid', name: 'teacher_distribution_id', comment: 'FK' })
  teacherDistributionId: string;

  /** Columns **/
  @Column({
    name: 'total_score',
    type: 'float',
    nullable:true,
    comment: 'Puntaje total de las respuestas',
  })
  totalScore: number;
}
