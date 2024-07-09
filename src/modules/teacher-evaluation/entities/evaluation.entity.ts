import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('evaluations', {schema: 'teacher_evaluation'})
export class EvaluationEntity {
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

    /** Columns **/
    @Column({
        name: 'code',
        type: 'varchar',
        comment: 'Código de la evaluación',
    })
    code: string;

    @Column({
        name: 'name',
        type: 'varchar',
        comment: 'Nombre de la evaluación',
    })
    name: string;
}
