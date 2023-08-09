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

@Entity('addresses', { schema: 'core' })
export class AddressEntity {
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

  /** Foreign Key **/
  @Column({
    name: 'model_id',
    type: 'varchar',
    comment: 'Foreign Key de cualquier otra entidad',
  })
  modelId: string;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'province_id' })
  province: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'canton_id' })
  canton: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'parrish_id' })
  parrish: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'latitude',
    type: 'float',
    default: 0,
    comment: 'Latitud',
  })
  latitude: number;

  @Column({
    name: 'longitude',
    type: 'float',
    default: 0,
    comment: 'Longitud',
  })
  longitude: number;

  @Column({
    name: 'main_street',
    type: 'varchar',
    nullable: true,
    comment: 'Calle Principal',
  })
  mainStreet: string;

  @Column({
    name: 'secondary_street',
    type: 'varchar',
    nullable: true,
    comment: 'Calle Interseccion',
  })
  secondaryStreet: string;

  @Column({
    name: 'number',
    type: 'varchar',
    nullable: true,
    comment: 'Numero de casa',
  })
  number: string;

  @Column({
    name: 'post_code',
    type: 'varchar',
    nullable: true,
    comment: 'Codigo Postal',
  })
  post_code: string;

  @Column({
    name: 'reference',
    type: 'text',
    nullable: true,
    comment: 'Referencia la ubicacion',
  })
  reference: string;
}
