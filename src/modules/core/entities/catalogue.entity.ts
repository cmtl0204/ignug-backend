import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueTypeEnum } from '@shared/enums';

@Entity('catalogues', { schema: 'core' })
export class CatalogueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la ultima actualizacion del registro',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
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

  @ManyToOne(() => CatalogueEntity, (category) => category.children)
  parent: CatalogueEntity;

  @OneToMany(() => CatalogueEntity, (category) => category.parent)
  children: CatalogueEntity[];

  @Column({
    name: 'code',
    type: 'varchar',
    comment: 'Codigo del catalogo',
  })
  code: string;

  @Column({
    name: 'description',
    type: 'varchar',
    comment: 'Descripcion del catalogo',
  })
  description: string;

  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre del catalogo',
  })
  name: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: CatalogueTypeEnum,
    comment: 'Tipo de menu',
  })
  type: CatalogueTypeEnum;
}
