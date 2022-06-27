import { CatalogueEntity } from './catalogue.entity';
import { CurriculumEntity } from './curriculum.entity';
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

@Entity('subjects')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'academic_period_id' })
  academicPeriod: CatalogueEntity;

  @ManyToOne(() => CurriculumEntity, { nullable: true })
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: CurriculumEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  @Column('int', {
    name: 'autonomous_hour',
    default: 0,
    comment: 'Hora autónoma de la asignatura',
  })
  autonomousHour: number;

  @Column('varchar', {
    name: 'code',
    length: 50,
    comment: 'Código de la asignatura',
  })
  code: string;

  @Column('float', {
    name: 'credit',
    nullable: true,
    default: 0,
    comment: 'Creditos de la asignatura',
  })
  credit: number;

  @Column('varchar', {
    name: 'name',
    length: 255,
    default: 'SN',
    comment: 'Nombre de la asignatura',
  })
  name: string;

  @Column('int', {
    name: 'practical_hour',
    default: 0,
    comment: 'Horas prácticas de la asignatura',
  })
  practicalHour: number;

  @Column('int', {
    name: 'scale',
    default: 0,
    comment: 'ponderable de la asignatura',
  })
  scale: number;

  @Column('int', {
    name: 'teacher_hour',
    default: 0,
    comment: 'Horas del docente',
  })
  teacherHour: number;

}