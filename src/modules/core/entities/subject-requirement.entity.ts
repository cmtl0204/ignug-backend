import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubjectEntity } from '@core/entities';
import { CatalogueCoreSubjectRequirementTypeEnum } from '@shared/enums';

@Entity('subject_requirements', { schema: 'core' })
export class SubjectRequirementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  /** Relationship **/
  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'requirement_id' })
  requirement: SubjectEntity;

  /** Columns **/
  @Column({
    name: 'is_enabled',
    type: 'boolean',
    comment: 'true=se valida, false=no se valida',
  })
  isEnabled: boolean;

  @Column({
    name: 'type',
    type: 'enum',
    enum: CatalogueCoreSubjectRequirementTypeEnum,
    comment: 'Horas de clase semanales',
  })
  type: CatalogueCoreSubjectRequirementTypeEnum;
}
