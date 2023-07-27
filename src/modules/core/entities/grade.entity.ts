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
import {
  CatalogueEntity,
  EnrollmentDetailEntity,
  EnrollmentEntity,
  SubjectEntity,
} from '@core/entities';

@Entity('grades', { schema: 'core' })
export class GradeEntity {
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

  /** Relationship **/
  @ManyToOne(() => EnrollmentDetailEntity)
  @JoinColumn({ name: 'enrollment_detail_id' })
  enrollmentDetail: EnrollmentDetailEntity;

  /** Columns **/
  @Column({
    name: 'value',
    type: 'decimal',
    precision: 5,
    scale: 2,
    comment: 'Valor de la calificacion',
  })
  value: number;
}
