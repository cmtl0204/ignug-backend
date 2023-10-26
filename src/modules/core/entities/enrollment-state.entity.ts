import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {CatalogueEntity, EnrollmentEntity, GradeEntity, SubjectEntity} from '@core/entities';

@Entity('enrollment_states', {schema: 'core'})
export class EnrollmentStateEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_timestamp',
        comment: 'Fecha de creacion del registro',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_timestamp',
        comment: 'Fecha de actualizacion del registro',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha de eliminacion del registro',
    })
    deletedAt: Date;

    /** Foreign Keys **/
    @ManyToOne(() => CatalogueEntity)
    @JoinColumn({name: 'state_id'})
    state: CatalogueEntity;
    @Column({type: 'uuid', name: 'state_id', comment: 'Estados'})
    stateId: string;

    @ManyToOne(() => EnrollmentEntity)
    @JoinColumn({name: 'enrollment_id'})
    enrollment: EnrollmentEntity;
    @Column({type: 'uuid', name: 'enrollment_id', comment: 'Matriculado'})
    enrollmentId: string;

    /** Columns **/
    @Column({
        name: 'observation',
        type: 'text',
        nullable: true,
        comment: 'Observaciones de la matricula',
    })
    observation: string;
}
