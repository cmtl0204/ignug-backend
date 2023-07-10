import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@auth/entities';
import { InformationStudentEntity } from '@core/entities';

@Entity('students', { schema: 'core' })
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Inverse Relationship **/
  @OneToOne(() => InformationStudentEntity)
  @JoinColumn({ name: 'student' })
  informationStudent: InformationStudentEntity;

  /** Relationship **/
  @OneToOne(() => UserEntity, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  /** Columns **/
  @Column({ name: 'name', type: 'varchar', comment: 'Nombre del estudiante' })
  name: string;
}
