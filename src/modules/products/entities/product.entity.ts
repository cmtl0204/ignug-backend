import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('float')
  price: number;

  @Column('boolean')
  free: boolean;

  // @Column('varchar', { length: 500 })
  // long_description: string;
  //
  // @Column('date')
  // registered_at: Date;
}
