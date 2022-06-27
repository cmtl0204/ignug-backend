import { StudentEntity } from 'src/modules/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('information_students')
export class InformationStudentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('varchar', { 
    name: 'address',
    length: 1000,
    comment: 'La direccion donde reside el estudiante',
   })
  address: string;

  @Column('integer', { 
    name: 'community',
    comment: 'Las horas realizadas por parte del estudiante en integracion con la sociedad',
   })
   community: number;

   @Column('varchar', { 
    name: 'contact_emergency_name',
    length: 255,
    comment: 'Nombre del contacto de emergencia para informar sobre el estudiante',
   })
   contactEmergencyName: string;

  @Column('varchar', { 
    name: 'contact_emergency_kinship',
    length: 255,
    comment: 'Nombre del contacto de emergencia de parentescos para informar sobre el estudiante',
   })
   contactEmergencyKinship: string;

  @Column('varchar', { 
    name: 'contact_emergency_phone', 
    length: 255,
    comment: 'Numeros de contacto de emergencia para informar sobre el estudiante',
   })
   contactEmergencyPhone: string;

  @Column('integer', { 
    name: 'disability_percentage',
    comment: 'El porcentaje de discapicidad que tiene el estudiante ',
   })
   disabilityPercentage: number;


  @Column('integer', { 
    name: 'economic_amount',
    comment: 'El monto de ayuda economica que el estudiante recibe',
   })
   economicAmount: number; 


   @Column('integer', { 
    name: 'educational_amount',
    comment: 'El monto de credito que el estudiante tiene',
   })
   educationalAmount: number;

  @Column('integer', { 
    name: 'family_income',
    comment: 'La direccion donde reside el estudiante',
   })
   familyIncome: number;

   @Column('varchar', { 
    name: 'is_lost_gratuity',
    length: 1,
    comment: 'Si el estudiante ah perdido la gratuidad en el instituto',
   })
   isLostGratuity: string;


   @Column('varchar', { 
    name: 'is_executed_practice',
    length: 1,
    comment: 'Si el estudiante ah realizado practicas = 1  , si no realizo = 2',
   })
   isExecutedPractice: string;

  @Column('varchar', { 
    name: 'is_executed_community',
    length: 1,
    comment: 'Si el estudiante ah realizado integracion con la sociedad = 1  , si no realizo = 2',
   })
   isExecutedCommunity: string;

   @Column('integer', { 
    name: 'members_house_number',
    comment: 'Numero de familiares con quien vive el estudiante',
   })
   membersHouseNumber: number;


   @Column('integer', { 
    name: 'practice_hours',
    comment: 'Las horas realizadas por parte del estudiante en pasantias',
   })
   practiceHours: number;

   @Column('varchar', { 
    name: 'postal_code',
    length: 100,
    comment: 'Codigo postal donde el estudiante reside',
   })
   postalCode: string;

  @Column('integer', { 
    name: 'scholarship_amount',
    comment: 'El monto de beca que el estudiante obtuvo',
   })
   scholarshipAmount: number;

  @Column('integer', { 
    name: 'tariff_scholarship_percentage',
    comment: 'El porcentaje de beca que cubre la institutcion el estudiante ',
   })
   tariffScholarshipPercentage: number;

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
  updateAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  @OneToOne(() => StudentEntity, (student) => student.information_student)
  @JoinColumn({name:'migratory_id'})
  student: StudentEntity;
}