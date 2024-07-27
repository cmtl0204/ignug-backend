import {
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EvaluationEntity } from './evaluation.entity';
import { CatalogueEntity } from '@core/entities';

@Entity('questions', { schema: 'teacher_evaluation' })
export class QuestionEntity {
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
  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'category_id' })
  category: CatalogueEntity;
  @Column({ type: 'uuid', name: 'category_id', comment: 'FK' })
  categoryId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'evaluation_type_id' })
  evaluationType: CatalogueEntity;
  @Column({ type: 'uuid', name: 'evaluation_type_id', comment: 'FK' })
  evaluationTypeId: string;

  /** Columns **/
  @Column({
    name: 'code',
    type: 'varchar',
    comment: 'Código de la pregunta',
  })
  code: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
    comment: 'Descripción de la pregunta',
  })
  description: string;

  @Column({
    name: 'name',
    type: 'text',
    comment: 'Nombre de la pregunta',
  })
  name: string;

  @Column({
    name: 'type',
    type: 'varchar',
    nullable: true,
    comment: 'Tipo de la pregunta',
  })
  type: string;

  @Column({
    name: 'sort',
    type: 'int',
    comment: '',
  })
  sort: number;
}
