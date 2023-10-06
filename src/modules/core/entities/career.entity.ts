import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity, CurriculumEntity, InstitutionEntity, StudentEntity, TeacherEntity } from '@core/entities';
import { UserEntity } from '@auth/entities';
import {CareerAcademicPeriodsEntity} from "./career-academic-periods.entity";

@Entity('careers', { schema: 'core' })
export class CareerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de creacion de la carrera',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de actualizacion de la carrera',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminacion de la carrera',
  })
  deletedAt: Date;

  @Column({
    name: 'is_visible',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  isVisible: boolean;

  @Column({
    name: 'is_enabled',
    type: 'boolean',
    default: true,
    comment: 'true=enabled, false=disabled',
  })
  isEnabled: boolean;

  /** Inverse Relationship **/
  @OneToMany(() => CareerAcademicPeriodsEntity, academicPeriod => academicPeriod.career)
  academicPeriods: CareerAcademicPeriodsEntity[];

  @OneToMany(() => CurriculumEntity, curriculum => curriculum.career)
  curriculums: CurriculumEntity[];

  @ManyToMany(() => StudentEntity, student => student.careers)
  @JoinTable({
    name: 'career_student',
    joinColumn: { name: 'career_id' },
    inverseJoinColumn: { name: 'student_id' },
  })
  students: StudentEntity[];

  @ManyToMany(() => TeacherEntity, teacher => teacher.careers)
  @JoinTable({
    name: 'career_teacher',
    joinColumn: { name: 'career_id' },
    inverseJoinColumn: { name: 'teacher_id' },
  })
  teachers: TeacherEntity[];

  @ManyToMany(() => UserEntity, user => user.careers)
  @JoinTable({
    name: 'career_user',
    joinColumn: { name: 'career_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: UserEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => InstitutionEntity, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'institution_id' })
  institution: InstitutionEntity;

  @Column({ type: 'uuid', comment: 'Institución a la que pertenece la carrera' })
  institution_id: string;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'modality_id' })
  modality: CatalogueEntity;

  @Column({ type: 'uuid', comment: 'Presencial, Distancia, Hibrida, etc' })
  modality_id: string;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @Column({ type: 'uuid', comment: 'Habilitada o Inhabilitada' })
  state_id: string;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  @Column({ type: 'uuid', comment: 'Tecnologia o Tecnicatura' })
  type_id: string;

  /** Columns **/
  @Column({
    name: 'acronym',
    type: 'varchar',
    comment: 'Acronimo de la carrera Ej. DS, MKT, GN',
  })
  acronym: string;

  @Column({
    name: 'code',
    type: 'varchar',
    comment: 'Código de la carrera',
  })
  code: string;

  @Column({
    comment: 'Código sniese de la carrera',
    type: 'varchar',
    name: 'code_sniese',
  })
  codeSniese: string;

  @Column({
    name: 'degree',
    type: 'varchar',
    comment: 'Título que otorga la carrera',
  })
  degree: string;

  @Column({
    name: 'logo',
    type: 'varchar',
    nullable: true,
    comment: 'Logo de la carrera',
  })
  logo: string;

  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre de la carrera',
  })
  name: string;

  @Column({
    comment: 'Numero de resolución de la carrera',
    type: 'varchar',
    name: 'resolution_number',
  })
  resolutionNumber: string;

  @Column({
    name: 'short_name',
    type: 'varchar',
    comment: 'Nombre corto de la carrera',
  })
  shortName: string;
}
