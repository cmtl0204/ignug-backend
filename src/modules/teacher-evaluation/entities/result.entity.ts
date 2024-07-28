import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import { ResponseEntity } from './response.entity';
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

    @ManyToOne(() => ResponseEntity)
    @JoinColumn({name: 'response_id'})
    response: ResponseEntity;
    @Column({type: 'uuid', name: 'response_id', comment: 'FK'})
    responseId: string;

    /** Columns **/

    @Column({
        name: 'score',
        type: 'float',
        comment: 'Puntaje de la respuesta',
    })
    score: number;
}
