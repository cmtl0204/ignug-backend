import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity, InstitutionEntity, TeacherEntity } from '@core/entities';
import { UserEntity } from '@auth/entities';

@Entity('careers', { schema: 'core' })
export class CareerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de creacion de la carrera',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de actualizacion de la carrera',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminacion de la carrera',
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
  @ManyToMany(() => TeacherEntity)
  @JoinTable({ name: 'career_teacher' })
  teachers: TeacherEntity[];

  /** Foreign Key **/
  @ManyToOne(() => InstitutionEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'institution_id' })
  institution: InstitutionEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'modality_id' })
  modality: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'acronym',
    type: 'varchar',
    comment: 'Acronimo de la carrera Ej. DS, MKT, GN',
  })
  acronym: string;

  @Column({
    name: 'code',
    type: 'varchar',
    comment: 'Código de la carrera',
  })
  code: string;

  @Column({
    comment: 'Código sniese de la carrera',
    type: 'varchar',
    name: 'code_sniese',
  })
  codeSniese: string;

  @Column({
    name: 'degree',
    type: 'varchar',
    comment: 'Título que otorga la carrera',
  })
  degree: string;

  @Column({
    name: 'logo',
    type: 'varchar',
    nullable: true,
    comment: 'Logo de la carrera',
  })
  logo: string;

  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre de la carrera',
  })
  name: string;

  @Column({
    comment: 'Numero de resolución de la carrera',
    type: 'varchar',
    name: 'resolution_number',
  })
  resolutionNumber: string;

  @Column({
    name: 'short_name',
    type: 'varchar',
    comment: 'Nombre corto de la carrera',
  })
  shortName: string;
}
