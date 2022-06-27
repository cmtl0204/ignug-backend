import { Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    PrimaryColumn, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn } 
    from "typeorm";

@Entity('careers')
export class CareerEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    // @Column('float')
    // institution_id: number;

    // @Column('float')
    // state: number;

    // @Column('float')
    // type: number;

    @Column('varchar', { 
        length: 10,
        comment: 'Acronimo de la carrera',
        name: 'acronym'
    })
    acronym: string;

    @Column('varchar', { 
        length: 50,
        comment: 'Codigo de la carrera',
        name: 'code'
     })
    code: string;

    @Column('varchar', { 
        length: 50,
        comment: 'Codigo sniese de la carrera',
        name: 'code_sniese'
    })
    codeSniese: string;

    @Column('varchar', { 
        length: 100, 
        nullable: true,
        comment: 'Logo de la carrera',
        name: 'logo'
    })
    logo: string;

    @Column('varchar', { 
        length: 100,
        comment: 'Modalidad de la carrera',
        name: 'modality'
    })
    modality: string;

    @Column('varchar', { 
        length: 255,
        comment: 'Nombre de la carrera',
        name: 'name'
    })
    name: string;

    @Column('float',{
        comment: 'Numero de resolucion de la carrera',
        name: 'resolution_number'
    })
    resolutionNumber: number;

    @Column('varchar', { 
        length: 255,
        comment: 'Nombre corto de la carrera',
        name: 'short_name'
    })
    shortName: string;

    @Column('varchar', { 
        length: 255,
        comment: 'Titulo de la carrera',
        name: 'title'
    })
    title:string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de creacion de la carrera'
      })
      createdAt: Date;
    
    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de actualizacion de la carrera'
      })
      updatedAt: Date;
    
    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
        comment: 'Fecha de eliminacion de la carrera'
      })
      deletedAt: Date;
}