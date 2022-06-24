import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column({ type: 'boolean' })
  married: boolean;

  @OneToOne(() => ProductEntity, (product) => product.user, { nullable: true })
  product: ProductEntity;
}
