import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@users/entities';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', comment: 'Nombre del estudiante' })
  name: string;

  @OneToOne(() => UserEntity, (user) => user.student, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
