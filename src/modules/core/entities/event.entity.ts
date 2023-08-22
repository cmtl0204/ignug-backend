import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CatalogueEntity, SchoolPeriodEntity } from '@core/entities';

@Entity('events', { schema: 'core' })
export class EventEntity {
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

  @Column({
    name: 'is_visible',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  isVisible: boolean;

  /** Foreign Keys **/
  @Column({
    name: 'model_id',
    type: 'varchar',
    comment: 'Foreign Key de cualquier otra entidad',
  })
  modelId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'name_id' })
  name: CatalogueEntity;

  @ManyToOne(() => SchoolPeriodEntity)
  @JoinColumn({ name: 'school_period_id' })
  schoolPeriod: SchoolPeriodEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'description',
    type: 'text',
    comment: '',
  })
  description: string;

  @Column({
    name: 'ended_at',
    type: 'date',
    comment: 'Fecha Inicio Evento',
  })
  endedAt: Date;

  @Column({
    name: 'order',
    type: 'int',
    comment: '',
  })
  order: number;

  @Column({
    name: 'started_at',
    type: 'date',
    comment: 'Fecha Inicio Evento',
  })
  startedAt: Date;
}
