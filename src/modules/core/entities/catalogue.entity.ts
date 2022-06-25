import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('catalogues')
export class CatalogueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  name: string;

  // @OneToMany(() => ProductEntity, (product) => product.type)
  // products: ProductEntity[];
}
