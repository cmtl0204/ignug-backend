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
import { SchoolPeriodEntity } from '@core/entities';
import { UserEntity } from '@auth/entities';

@Entity('auto-evaluations', { schema: 'teacher_evaluation' })
export class AutoEvaluationEntity {
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
  @JoinColumn({ name: 'evaluated_id' })
  evaluated: UserEntity;
  @Column({ type: 'uuid', name: 'evaluated_id', comment: 'FK Docente Evaluado' })
  evaluatedId: string;

  @ManyToOne(() => SchoolPeriodEntity)
  @JoinColumn({ name: 'school_period_id' })
  schoolPeriod: SchoolPeriodEntity;
  @Column({ type: 'uuid', name: 'school_period_id', comment: 'FK Periodo Lectivo' })
  schoolPeriodId: string;

  /** Columns **/
  @Column({
    name: 'total_score',
    type: 'float',
    comment: 'Puntaje total de las respuestas',
  })
  totalScore: number;
}
