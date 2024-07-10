import {Injectable, Inject, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {CreateEvaluationDto} from '../dto/evaluation/create-evaluation.dto';
import {UpdateEvaluationDto} from '../dto/evaluation/update-evaluation.dto';
import {EvaluationEntity} from '../entities/evaluation.entity';
import {CoreRepositoryEnum} from '@shared/enums';

@Injectable()
export class EvaluationService {
    constructor(
        @Inject(CoreRepositoryEnum.EVALUATION_REPOSITORY) private readonly repository: Repository<EvaluationEntity>
    ) {
    }

    async create(payload: CreateEvaluationDto): Promise<EvaluationEntity> {
        const newEvaluation = this.repository.create(payload);
        return await this.repository.save(newEvaluation);
    }

    async findAll(): Promise<EvaluationEntity[]> {
        return await this.repository.find();
    }

    async findOne(id: string): Promise<EvaluationEntity> {
        const evaluation = await this.repository.findOneBy({id});

        if (!evaluation) {
            throw new NotFoundException('La evaluación no existe');
        }

        return evaluation;
    }

    async update(id: string, payload: UpdateEvaluationDto): Promise<EvaluationEntity> {
        const evaluation = await this.repository.findOneBy({id});

        if (!evaluation) {
            throw new NotFoundException('Evaluation not found');
        }

        this.repository.merge(evaluation, payload);

        return await this.repository.save(evaluation);
    }

    async remove(id: string): Promise<EvaluationEntity> {
        const evaluation = await this.repository.findOneBy({id});

        if (!evaluation) {
            throw new NotFoundException('Evaluation not found');
        }

        return await this.repository.softRemove(evaluation);
    }
}
