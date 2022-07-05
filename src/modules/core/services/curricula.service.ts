import { CareerEntity } from '@core/entities';
import { CatalogueEntity } from '@core/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('curricula')
export class CurriculumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CareerEntity, (career) => career.curriculumId)
  career: CareerEntity;

  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.curriculumId)
  state: CatalogueEntity;

  @Column('varchar', {
    name: 'code',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  code: string;

  @CreateDateColumn({
    name: 'ended_At',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  endedAt: Date;

  @CreateDateColumn({
    name: 'started_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  startedAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAT: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAT: Date;

  @Column('varchar', {
    name: 'name',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  name: string;

  @Column('varchar', {
    name: 'description',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  description: string;

  @Column('float', {
    name: 'weeks_Number',
    comment: 'Precio del producto',
  })
  weeksNumber: number;

  @Column('varchar', {
    name: 'resolution_Number',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  resolutionNumber: string;

  @Column('float', {
    name: 'periodic_Academic_Number',
    comment: 'Precio del producto',
  })
  periodicAcademicNumber: number;
}
