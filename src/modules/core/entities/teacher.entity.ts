import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@auth/entities';
import {
  InformationStudentEntity,
  InformationTeacherEntity,
} from '@core/entities';

@Entity('teachers', { schema: 'core' })
export class TeacherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Inverse Relationship **/
  @OneToOne(() => InformationStudentEntity)
  @JoinColumn({ name: 'student' })
  informationTeacherEntity: InformationTeacherEntity;

  /** Relationship **/
  @OneToOne(() => UserEntity, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  /** Columns **/
  @Column({ name: 'name', type: 'varchar', comment: 'Nombre del estudiante' })
  name: string;
}
