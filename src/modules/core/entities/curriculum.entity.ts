import {
  Column, 
  CreateDateColumn,
  Entity, 
  PrimaryGeneratedColumn } from "typeorm";

@Entity('curricula')
export class CurriculumEntity {

@PrimaryGeneratedColumn()
id:number;

//  @Column('varchar', {
//     name: 'name',
//     length: 255,
//     default: 'SN',
//     comment: 'Nombre del producto',
//   })
//   career:number;

  @Column('varchar', {
    name: 'code',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  code:string;

  // @CreateDateColumn({
  //   name: 'start_at',
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  //  started: Date;
    
  @CreateDateColumn({
    name: 'ended_At',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera'
  })
endedAt:Date;

@CreateDateColumn({
  name: 'started_at',
  type: 'timestamptz',
  default: () => 'CURRENT_TIMESTAMP',
  comment: 'Fecha de creacion de la carrera'
})
startedAt: Date;

@Column('varchar', {
  name: 'name',
  length: 255,
  default: 'SN',
  comment: 'Nombre del producto',
})
   name:string;
  
   @Column('varchar', {
    name: 'description',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
   description:string;
  
    @Column('float', {
     name: 'weeks_Number',
    comment: 'Precio del producto',
   })
   weeksNumber:number;
  
  @Column('varchar', {
    name: 'resolution_Number',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  resolutionNumber:string;

  @Column('float', {
  name: 'periodic_Academic_Number',
  comment: 'Precio del producto',
   })
  periodicAcademicNumber:number;

}
