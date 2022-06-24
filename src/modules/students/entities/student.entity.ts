import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', comment: 'Nombre del estudiante' })
  name: string;

  @OneToOne(() => User, (user) => user.student, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
