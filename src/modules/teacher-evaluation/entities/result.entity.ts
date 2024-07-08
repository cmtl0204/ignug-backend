import {
    BeforeInsert, BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {EnrollmentDetailEntity, PartialEntity} from '@core/entities';
import {getDateFormat} from "@shared/helpers";
import { EvaluationEntity } from './evaluation.entity';
import { QuestionEntity } from './question.entity';

@Entity('results', {schema: 'teacher_evaluation'})
export class ResultEntity {
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
    @Column({
        name: 'model_id',
        type: 'varchar',
        comment: 'Foreign Key de cualquier otra entidad',
    })
    modelId: string;

    /** Columns **/
    @Column({
        name: 'code',
        type: 'varchar',
        comment: 'Código de la respuesta',
    })
    code: string;

    @Column({
        name: 'description',
        type: 'text',
        comment: 'Descripción de la respuesta',
    })
    description: string;

    @Column({
        name: 'name',
        type: 'text',
        comment: 'Nombre de la respuesta',
    })
    name: string;

    @Column({
        name: 'score',
        type: 'float',
        comment: 'Puntaje de la respuesta',
    })
    score: string;
}
