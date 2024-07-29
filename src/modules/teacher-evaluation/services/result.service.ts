import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResultEntity } from '../entities/result.entity';
import { TeacherEvaluationRepositoryEnum } from '@shared/enums';
import { AutoEvaluationService } from './auto-evaluation.service';
import { ResponseEntity } from '../entities/response.entity';
import { PartnerEvaluationService } from './partner-evaluation.service';
import { StudentEvaluationService } from './student-evaluation.service';

@Injectable()
export class ResultService {
  constructor(
    @Inject(TeacherEvaluationRepositoryEnum.RESULT_REPOSITORY) private readonly resultRepository: Repository<ResultEntity>,
    private readonly autoEvaluationService: AutoEvaluationService,
    private readonly partnerEvaluationService: PartnerEvaluationService,
    private readonly studentEvaluationService: StudentEvaluationService,
  ) {
  }

  async createAutoEvaluationResults(autoEvaluationId: string, payload: any[]): Promise<ResultEntity[]> {
    const evaluation = await this.autoEvaluationService.findOne(autoEvaluationId);

    if (evaluation && !evaluation.enabled) {
      throw new BadRequestException('No tiene permisos para realizar le evaluación');
    }

    if (evaluation && evaluation.totalScore) {
      throw new BadRequestException({
        error: 'La evaluación ya fue respondida',
        message: 'No puede enviar más de una vez',
      });
    }

    const result = this.resultRepository.create(payload);

    if (evaluation) {
      evaluation.totalScore = payload.reduce((accumulator: number, currentValue: ResponseEntity): number => {
        return accumulator + currentValue.score;
      }, 0);
    }

    await this.autoEvaluationService.update(evaluation.id, evaluation);

    return await this.resultRepository.save(result);
  }

  async createPartnerEvaluationResults(partnerEvaluationId: string, payload: any[]): Promise<ResultEntity[]> {
    const evaluation = await this.partnerEvaluationService.findOne(partnerEvaluationId);

    if (evaluation && !evaluation.enabled) {
      throw new BadRequestException('No tiene permisos para realizar le evaluación');
    }

    if (evaluation && evaluation.totalScore) {
      throw new BadRequestException({
        error: 'La evaluación ya fue respondida',
        message: 'No puede enviar más de una vez',
      });
    }

    const result = this.resultRepository.create(payload);

    if (evaluation) {
      evaluation.totalScore = payload.reduce((accumulator: number, currentValue: ResponseEntity): number => {
        return accumulator + currentValue.score;
      }, 0);
    }

    await this.partnerEvaluationService.update(evaluation.id, evaluation);

    return await this.resultRepository.save(result);
  }

  async createStudentEvaluationResults(studentEvaluationId: string, payload: any[]): Promise<ResultEntity[]> {
    const evaluation = await this.studentEvaluationService.findOne(studentEvaluationId);

    console.log(evaluation);
    if (evaluation && !evaluation.enabled) {
      throw new BadRequestException('No tiene permisos para realizar le evaluación');
    }

    if (evaluation && evaluation.totalScore) {
      throw new BadRequestException({
        error: 'La evaluación ya fue respondida',
        message: 'No puede enviar más de una vez',
      });
    }

    const result = this.resultRepository.create(payload);

    if (evaluation) {
      evaluation.totalScore = payload.reduce((accumulator: number, currentValue: ResponseEntity): number => {
        return accumulator + currentValue.score;
      }, 0);
    }

    await this.studentEvaluationService.update(evaluation.id, evaluation);

    return await this.resultRepository.save(result);
  }
}
