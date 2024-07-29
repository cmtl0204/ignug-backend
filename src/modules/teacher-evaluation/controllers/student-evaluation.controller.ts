import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe, Query,
} from '@nestjs/common';
import { ResponseHttpModel } from '@shared/models';
import { StudentEvaluationService } from '../services/student-evaluation.service';

@Controller('teacher-evaluations/student-evaluations')
export class StudentEvaluationController {
  constructor(private readonly studentResultService: StudentEvaluationService) {
  }

  @Get('evaluators/:evaluatorId')
  @HttpCode(HttpStatus.OK)
  async findStudentEvaluationsByEvaluator(
    @Param('evaluatorId', ParseUUIDPipe) evaluatorId: string,
    @Query('schoolPeriodId', ParseUUIDPipe) schoolPeriodId: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentResultService.findStudentEvaluationsByEvaluator(evaluatorId, schoolPeriodId);

    return {
      data: serviceResponse,
      message: 'La encuesta creada exitosamente',
      title: 'Encuesta Realizada',
    };
  }
}
