import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CatalogueEntity, CurriculumEntity } from '@core/entities';

@Entity('subjects', { schema: 'core' })
export class SubjectEntity {
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

  @ManyToOne(() => CatalogueEntity, { nullable: false })
  @JoinColumn({ name: 'academic_period_id' })
  academicPeriod: CatalogueEntity;

  @ManyToOne(() => CurriculumEntity, { nullable: false })
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: CurriculumEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: false })
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  @Column({
    name: 'autonomous_hour',
    type: 'int',
    default: 0,
    comment: 'Hora autónoma de la asignatura',
  })
  autonomousHour: number;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 100,
    comment: 'Código de la asignatura',
  })
  code: string;

  @Column({
    name: 'float',
    type: 'varchar',
    nullable: true,
    default: 0,
    comment: 'Creditos de la asignatura',
  })
  credit: number;

  @Column({
    name: 'name',
    type: 'varchar',
    default: 'SN',
    comment: 'Nombre de la asignatura',
  })
  name: string;

  @Column({
    name: 'practical_hour',
    type: 'int',
    default: 0,
    comment: 'Horas prácticas de la asignatura',
  })
  practicalHour: number;

  @Column({
    name: 'scale',
    type: 'int',
    default: 0,
    comment: 'ponderable de la asignatura',
  })
  scale: number;

  @Column({
    name: 'teacher_hour',
    type: 'int',
    default: 0,
    comment: 'Horas del docente',
  })
  teacherHour: number;
}
