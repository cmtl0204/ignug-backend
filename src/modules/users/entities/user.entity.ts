import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { CatalogueEntity, StudentEntity } from '@core/entities';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => StudentEntity, (student) => student.user)
  student: StudentEntity;

  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.user)
  student: StudentEntity;

  @Column('date', {
    name: 'birthdate',
    comment: 'Fecha de nacimiento',
    nullable: true,
  })
  birthdate: Date;

  @Column('varchar', { name: 'lastname', length: 255, comment: 'Apellidos' })
  lastname: string;

  @Column('varchar', { name: 'password', length: 100, comment: 'Contraseña' })
  password: string;

  @Column('varchar', { name: 'name', length: 255, comment: 'Nombres' })
  name: string;

  @Column('varchar', {
    name: 'username',
    length: 100,
    comment: 'Nombre de usuario para ingreso al sistema',
  })
  username: string;
}
