import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CareerEntity } from './career.entity';
import { InformationStudentEntity } from './information-student.entity';

@Entity('catalogues')
export class CatalogueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  name: string;

  //relacion con la tabla career
  @OneToMany(() => CareerEntity, (career) => career.modality)
  modalities: CareerEntity[];

  @OneToMany(() => CareerEntity, (career) => career.state)
  states: CareerEntity[];

  @OneToMany(() => CareerEntity, (career) => career.type)
  types: CareerEntity[];

  @OneToMany(
    () => InformationStudentEntity,
    (informationStudent) => informationStudent.isBonusDevelopmentReceive,
  )
  isBonusDevelopmentReceive: InformationStudentEntity[];

  @OneToMany(
    () => InformationStudentEntity,
    (informationStudent) => informationStudent.isAncestralLanguage,
  )
  isAncestralLanguage: InformationStudentEntity[];
  @OneToMany(
    () => InformationStudentEntity,
    (informationStudent) => informationStudent.isDisability,
  )
  isDisability: InformationStudentEntity[];

  @OneToMany(
    () => InformationStudentEntity,
    (informationStudent) => informationStudent.isDegreeSuperior,
  )
  isDegreeSuperior: InformationStudentEntity[];

  @OneToMany(
    () => InformationStudentEntity,
    (informationStudent) => informationStudent.isSubjectRepeat,
  )
  isSubjectRepeat: InformationStudentEntity[];
}
