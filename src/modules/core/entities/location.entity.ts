import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity } from '@core/entities';

@Entity('locations', { schema: 'core' })
export class LocationEntity {
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
  @ManyToOne(() => LocationEntity, (location) => location.children)
  parent: LocationEntity;

  @OneToMany(() => LocationEntity, (location) => location.parent)
  children: LocationEntity[];

  /** Columns **/
  @Column({
    name: 'code',
    type: 'varchar',
    nullable: true,
    comment: 'Codigo',
  })
  code: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: true,
    comment: 'Codigo',
  })
  name: string;

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
    name: 'level',
    type: 'integer',
    default: 0,
    comment: '1=Pais, 2=provincia, 3=canton, 4=parroquia',
  })
  level: number;

  @Column({
    name: 'zone',
    type: 'varchar',
    nullable: true,
    comment: 'Urbana o Rural',
  })
  zone: string;
}
