import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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
}
