import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentEvaluationEntity } from '../entities/student-evaluation.entity';
import { TeacherEvaluationRepositoryEnum } from '@shared/enums';
import { AutoEvaluationEntity } from '../entities/auto-evaluation.entity';

@Injectable()
export class StudentEvaluationService {
  constructor(
    @Inject(TeacherEvaluationRepositoryEnum.STUDENT_EVALUATION_REPOSITORY)
    private readonly repository: Repository<StudentEvaluationEntity>,
  ) {
  }

  async update(id: string, payload: any): Promise<AutoEvaluationEntity[]> {
    const evaluation = await this.repository.findOneBy({ id });

    if (!evaluation) {
      throw new NotFoundException('Evaluación por pares no encontrada');
    }

    return this.repository.save(payload);
  }

  async findOne(id: string): Promise<StudentEvaluationEntity> {
    return await this.repository.findOne(
      {
        relations: { teacherDistribution: true, evaluator: true, evaluationType: true },
        where: { id },
      });
  }

  async findStudentEvaluationByEvaluator(evaluatorId: string, schoolPeriodId: string, teacherDistributionId: string): Promise<StudentEvaluationEntity> {
    return await this.repository.findOne(
      {
        relations: { teacherDistribution: true, evaluator: true, evaluationType: true },
        where: { evaluatorId, schoolPeriodId, teacherDistributionId },
      });
  }

  async findStudentEvaluationsByEvaluator(evaluatorId: string, schoolPeriodId: string): Promise<StudentEvaluationEntity[]> {
    return await this.repository.find(
      {
        relations: {
          teacherDistribution: { subject: true, teacher: { user: true } },
          evaluator: true,
          evaluationType: true,
        },
        where: { evaluatorId, schoolPeriodId },
      });
  }
}
