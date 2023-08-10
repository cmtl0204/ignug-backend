import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CatalogueEntity, EnrollmentDetailEntity, EnrollmentEntity, SchoolPeriodEntity, SubjectEntity } from '@core/entities';

@Entity('partials', { schema: 'core' })
export class PartialEntity {
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
  @ManyToOne(() => SchoolPeriodEntity)
  @JoinColumn({ name: 'school_period_id' })
  schoolPeriod: SchoolPeriodEntity;

  /** Columns **/
  @Column({
    name: 'date',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de asistencia',
  })
  date: Date;

  @Column({
    name: 'value',
    type: 'integer',
    default: 0,
    comment: 'Valor de la asistencia',
  })
  value: number;
}
