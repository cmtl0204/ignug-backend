import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEvaluationDto} from '../dto/evaluation/create-evaluation.dto';
import { UpdateEvaluationDto} from '../dto/evaluation/update-evaluation.dto';
import { FilterEvaluationDto} from '../dto/evaluation/filter-evaluation.dto';
import { EvaluationEntity } from '../entities/evaluation.entity';
import { CoreRepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';

@Injectable()
export class EvaluationService {
  constructor(
    @Inject(CoreRepositoryEnum.EVALUATION_REPOSITORY)
    private readonly repository: Repository<EvaluationEntity>,
  ) {}

  async create(payload: CreateEvaluationDto): Promise<ServiceResponseHttpModel> {
    const newEvaluation = this.repository.create(payload);
    const evaluation = await this.repository.save(newEvaluation);
    return { data: evaluation };
  }

  async findAll(params?: FilterEvaluationDto): Promise<ServiceResponseHttpModel> {
    const evaluations = await this.repository.find();
    return { data: evaluations };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const evaluation = await this.repository.findOneBy({ id });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    return { data: evaluation };
  }

  async update(id: string, payload: UpdateEvaluationDto): Promise<ServiceResponseHttpModel> {
    const evaluation = await this.repository.findOneBy({ id });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    this.repository.merge(evaluation, payload);
    const updatedEvaluation = await this.repository.save(evaluation);

    return { data: updatedEvaluation };
  }

  async remove(id: string): Promise<void> {
    const evaluation = await this.repository.findOneBy({ id });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    await this.repository.softRemove(evaluation);
  }
}
