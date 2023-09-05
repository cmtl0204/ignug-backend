import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '@auth/entities';
import { CareerEntity, InformationStudentEntity } from '@core/entities';

@Entity('students', { schema: 'core' })
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    name: 'is_visible',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  isVisible: boolean;

  /** Inverse Relationship **/
  @ManyToMany(() => CareerEntity, career => career.students)
  careers: CareerEntity[];

  @OneToOne(() => InformationStudentEntity, informationStudentEntity => informationStudentEntity.student)
  informationStudent: InformationStudentEntity;

  /** Foreign Keys **/
  @OneToOne(() => UserEntity, user => user.student, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @Column({ type: 'uuid', comment: 'Usuario: estudiante' })
  user_id: string;

  /** Columns **/
}
