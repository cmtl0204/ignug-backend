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
import {
  CareerEntity,
  CatalogueEntity,
  InstitutionEntity,
} from '@core/entities';
import { UserEntity } from '@auth/entities';

@Entity('school_periods', { schema: 'core' })
export class SchoolPeriodEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
    comment: 'Fecha de creacion de la carrera',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
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

  @ManyToMany(() => CareerEntity)
  @JoinTable({ name: 'career_school_period' })
  careers: CareerEntity[];

  @ManyToMany(() => InstitutionEntity)
  @JoinTable({ name: 'institution_school_period' })
  institutions: InstitutionEntity[];

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @Column({
    name: 'acronym',
    type: 'varchar',
    comment: 'Acronimo del periodo lectivo',
  })
  acronym: string;

  @Column({
    name: 'code',
    type: 'varchar',
    comment: 'Codigo de la carrera',
  })
  code: string;

  @Column({
    comment: 'Codigo sniese de la carrera',
    type: 'varchar',
    name: 'code_sniese',
  })
  codeSniese: string;

  @Column({
    name: 'degree',
    type: 'varchar',
    comment: 'Titulo que otorga la carrera',
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
    comment: 'Numero de resolucion de la carrera',
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
