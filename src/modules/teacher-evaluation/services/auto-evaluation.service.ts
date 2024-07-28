import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/question/create-question.dto';
import { UpdateQuestionDto } from '../dto/question/update-question.dto';
import { FilterQuestionDto } from '../dto/question/filter-question.dto';
import { QuestionEntity } from '../entities/question.entity';
import { TeacherEvaluationRepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { AutoEvaluationEntity } from '../entities/auto-evaluation.entity';
import { ResultEntity } from '../entities/result.entity';
import { UserEntity } from '@auth/entities';

@Injectable()
export class AutoEvaluationService {
  constructor(
    @Inject(TeacherEvaluationRepositoryEnum.AUTO_EVALUATION_REPOSITORY) private readonly repository: Repository<AutoEvaluationEntity>,
    @Inject(TeacherEvaluationRepositoryEnum.RESULT_REPOSITORY) private readonly resultRepository: Repository<ResultEntity>,
  ) {
  }

  async create(payload: any): Promise<ResultEntity[]> {
    const newResult = this.resultRepository.create(payload);
    console.log(newResult);
    return await this.resultRepository.save(newResult);
  }

  async update(id: string, payload: any): Promise<AutoEvaluationEntity[]> {
    const autoEvaluation = await this.repository.findOneBy({ id });

    if (!autoEvaluation) {
      throw new NotFoundException('Autoevaluación no encontrada');
    }

    return this.repository.save(payload);
  }

  async findAutoEvaluationByEvaluated(evaluatedId: string): Promise<AutoEvaluationEntity> {
    const autoEvaluation = await this.repository.findOne(
      {
        relations: { evaluated: true, evaluationType: true },
        where: { evaluatedId },
      });

    // if (!autoEvaluation) {
    //   throw new NotFoundException('Auto Evaluación no encontrada');
    // }

    return autoEvaluation;
  }
}
