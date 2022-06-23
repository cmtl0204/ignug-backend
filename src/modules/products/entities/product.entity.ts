import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/*
    name: 'name',
    unique: true,
    nullable: true,
    default: () => 'SN',
    comment: 'Esto es un comentario para la base de datos',
 */
@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  name: string;

  @Column('float', {
    name: 'price',
    unsigned: true,
    comment: 'Precio del producto',
  })
  price: number;

  @Column('boolean', {
    name: 'free',
    default: false,
    comment: 'Si el producto es gratis o no (true=>gratis, false=pagado)',
  })
  free: boolean;

  @Column('varchar', {
    name: 'long_description',
    length: 500,
    nullable: true,
    comment: 'Descripción del producto',
  })
  longDescription: string;

  @Column('date', {
    name: 'registered_at',
    comment: 'Fecha en la que se registro el producto',
  })
  registeredAt: Date;

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
}
