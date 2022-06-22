import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('float')
  price: number;

  @Column('boolean')
  free: boolean;

  @Column('varchar', { length: 500, nullable: true })
  long_description: string;

  @Column('date')
  registered_at: Date;
}
