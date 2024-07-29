import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TeacherEvaluationRepositoryEnum } from '@shared/enums';
import { AutoEvaluationEntity } from '../entities/auto-evaluation.entity';
import { ResultEntity } from '../entities/result.entity';
import { PartnerEvaluationEntity } from '../entities/partner-evaluation.entity';

@Injectable()
export class PartnerEvaluationService {
  constructor(
    @Inject(TeacherEvaluationRepositoryEnum.PARTNER_EVALUATION_REPOSITORY) private readonly repository: Repository<PartnerEvaluationEntity>,
    @Inject(TeacherEvaluationRepositoryEnum.RESULT_REPOSITORY) private readonly resultRepository: Repository<ResultEntity>,
  ) {
  }

  async update(id: string, payload: any): Promise<AutoEvaluationEntity[]> {
    const evaluation = await this.repository.findOneBy({ id });

    if (!evaluation) {
      throw new NotFoundException('Evaluación por pares no encontrada');
    }

    return this.repository.save(payload);
  }

  async findPartnerEvaluationByEvaluator(evaluatorId: string, schoolPeriodId: string): Promise<PartnerEvaluationEntity> {
    return await this.repository.findOne(
      {
        relations: { evaluated: true, evaluator: true, evaluationType: true },
        where: { evaluatorId, schoolPeriodId },
      });
  }

  async findOne(id: string): Promise<PartnerEvaluationEntity> {
    return await this.repository.findOne(
      {
        relations: { evaluated: true, evaluator: true, evaluationType: true },
        where: { id },
      });
  }
}
