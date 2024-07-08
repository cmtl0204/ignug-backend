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

@Entity('questions', {schema: 'teacher_evaluation'})
export class QuestionEntity {
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
    @ManyToOne(() => EvaluationEntity)
    @JoinColumn({name: 'evaluation_id'})
    evaluation: EvaluationEntity;
    @Column({type: 'uuid', name: 'evaluation_id', comment: 'FK'})
    evaluationId: string;

    /** Columns **/
    @Column({
        name: 'code',
        type: 'varchar',
        comment: 'Código de la pregunta',
    })
    code: string;

    @Column({
        name: 'description',
        type: 'text',
        comment: 'Descripción de la pregunta',
    })
    description: string;

    @Column({
        name: 'name',
        type: 'text',
        comment: 'Nombre de la pregunta',
    })
    name: string;

    @Column({
        name: 'type',
        type: 'varchar',
        comment: 'Tipo de la pregunta',
    })
    type: string;
}
