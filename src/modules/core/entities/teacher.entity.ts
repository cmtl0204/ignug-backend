import { CataloguesService } from 'src/catalogue/catalogue.service';
import { CatalogueEntity } from 'src/catalogue/entities/catalogue.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

@Entity('teacher')
export class TeacherEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CatalogueEntity, (catalogue) => catalogue.teacher, { nullable:false })
  @JoinColumn({ name: 'teaching_ladder_id' })
  catalogue: CatalogueEntity;
  teachingLadderId: CataloguesService
  /*
  @Column('float')
   teachingLadderId: number;
  @Column( 'float' )
   dedicationTimeId: number;
  @Column( 'float' )
   higherEducationId: number;
  @Column( 'float' )
   countryHigherEducationId: number;
  @Column( 'float' )
   scholarshipId: number;
  @Column( 'float' )
   scholarshipTypeId: number;
  @Column( 'float' )
   financingTypeId: number;*/

   
  @Column( 'varchar', {
    name: 'academic_unit',
    length: 255,
    comment: 'Academia unidad'
  })
   academicUnit: string;

  @Column( 'integer', {
    name: 'administrative_hours',
    comment: 'Horas administrativas'
  })
   administrativeHours: number;

   @Column( 'integer', {
    name: 'class_hours',
    comment: 'Horas de clases'
  })   
  classHours: number;

  @Column( 'integer', {
    name: 'community_hours',
    comment: 'Horas de  comunidad'
  })   
  communityHours: number;

  @Column( 'varchar', {
    name: 'degree_higher_education',
    length: 255,
    comment: 'Educacion'
  })
   degreeHigherEducation: string;

     @Column('date', {
      name: 'holidays',
      comment: 'Fecha de salida',
    })  
     holidays: Date;

    @Column('date', {
      name: 'home_vacation',
      comment: 'Fecha de vacaciones',
    })   
    homeVacation: Date;

   @Column( 'integer', {
    name: 'hours_worked',
    comment: 'Horas de trabajo'
  })  
  hoursWorked: number;

     @Column( 'varchar', {
      name: 'institution_higher_education',
      length: 255,
      comment: 'Institucion educativa'
    })   
    institutionHigherEducation: string;

    @Column( 'varchar', {
      name: 'other_hours',
      length: 255,
      comment: 'otras horas de trabajo'
    })  
     otherHours: string;

   @Column( 'integer', {
    name: 'publications',
    comment: 'Publicaciones'
  })    
   publications: number;

  @Column( 'integer', {
    name: 'scholarship_amount',
    comment: 'Horas de trabajo'
  })    
   scholarshipAmount: number;

  @Column( 'integer', {
    name: 'total_subjects',
    comment: 'total de sujetos'
  })     
  totalSubjects: number;

  @Column( 'varchar', {
    name: 'technical',
    length: 255,
    comment: 'tenico'
  })   
  technical: string;

  @Column( 'varchar', {
    name: 'technology',
    length: 255,
    comment: 'tecnologia'
  })  
   technology: string;

   @Column( 'integer', {
    name: 'total_publications',
    comment: 'publicaciones totales'
  })     
  totalPublications: number;

     @CreateDateColumn({
      name: 'created_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      name: 'updated_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
  
    @DeleteDateColumn({
      name: 'deleted_at',
      type: 'timestamptz',
      nullable: true,
    })
    deletedAt: Date;
  }