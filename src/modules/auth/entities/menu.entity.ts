import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { CatalogueEntity, StudentEntity } from '@core/entities';
import { MenuTypeEnum } from '../enums/menu.enum';

@Entity('menus', { schema: 'auth' })
export class UserEntity {
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

  @Column('varchar', {
    name: 'name',
    length: 150,
    unique: true,
    comment: 'Nombre del rol',
  })
  name: string;

  @Column('varchar', {
    name: 'icon',
    length: 150,
    unique: true,
    comment: 'Icono',
  })
  icon: string;

  @Column('varchar', {
    name: 'router_link',
    unique: true,
    comment: 'Nombre del rol',
  })
  routerLink: string;

  @Column('enum', {
    name: 'type',
    enum: MenuTypeEnum,
    unique: true,
    comment: 'Tipo de menu',
  })
  type: MenuTypeEnum;

  @BeforeInsert()
  @BeforeUpdate()
  async setName() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toLowerCase().trim();
  }
}
