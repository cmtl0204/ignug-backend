import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResultEntity } from '../entities/result.entity';
import { TeacherEvaluationRepositoryEnum } from '@shared/enums';
import { AutoEvaluationService } from './auto-evaluation.service';
import { ResponseEntity } from '../entities/response.entity';

@Injectable()
export class ResultService {
  constructor(
    @Inject(TeacherEvaluationRepositoryEnum.RESULT_REPOSITORY) private readonly resultRepository: Repository<ResultEntity>,
    private readonly autoEvaluationService: AutoEvaluationService,
  ) {
  }

  async createAutoEvaluation(evaluatedId: string, payload: any[]): Promise<ResultEntity[]> {
    const result = this.resultRepository.create(payload);

    const autoEvaluation = await this.autoEvaluationService.findAutoEvaluationByEvaluated(evaluatedId);

    if (autoEvaluation) {
      autoEvaluation.totalScore = payload.reduce((accumulator: number, currentValue: ResponseEntity): number => {
        return accumulator + currentValue.score;
      }, 0);
    }

    await this.autoEvaluationService.update(autoEvaluation.id,autoEvaluation);

    return await this.resultRepository.save(result);
  }
}
