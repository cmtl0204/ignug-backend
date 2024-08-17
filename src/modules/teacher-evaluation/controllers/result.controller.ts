import {
  Body,
  Controller,
  HttpCode,
  HttpStatus, Param,
  Post,
} from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { ResponseHttpModel } from '@shared/models';
import { Auth } from '@auth/decorators';

@Auth()
@Controller('teacher-evaluations/results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {
  }

  @Post('auto-evaluations/:autoEvaluationId')
  @HttpCode(HttpStatus.CREATED)
  async createAutoEvaluationResults(@Param('autoEvaluationId') autoEvaluationId: string, @Body() payload: any): Promise<ResponseHttpModel> {
    const result = await this.resultService.createAutoEvaluationResults(autoEvaluationId, payload);

    return {
      data: result,
      message: 'Resultado creado exitosamente',
      title: 'Resultado Creado',
    };
  }

  @Post('partner-evaluations/:partnerEvaluationId')
  @HttpCode(HttpStatus.CREATED)
  async createPartnerEvaluationResults(@Param('partnerEvaluationId') partnerEvaluationId: string, @Body() payload: any): Promise<ResponseHttpModel> {
    const result = await this.resultService.createPartnerEvaluationResults(partnerEvaluationId, payload);

    return {
      data: result,
      message: 'Resultado creado exitosamente',
      title: 'Resultado Creado',
    };
  }

  @Post('student-evaluations/:studentEvaluationId')
  @HttpCode(HttpStatus.CREATED)
  async createStudentEvaluationResults(@Param('studentEvaluationId') studentEvaluationId: string, @Body() payload: any): Promise<ResponseHttpModel> {
    const result = await this.resultService.createStudentEvaluationResults(studentEvaluationId, payload);

    return {
      data: result,
      message: 'Resultado creado exitosamente',
      title: 'Resultado Creado',
    };
  }

  @Post('coordinator-evaluations/:coordinatorEvaluationId')
  @HttpCode(HttpStatus.CREATED)
  async createCoordinatorEvaluationResults(@Param('coordinatorEvaluationId') coordinatorEvaluationId: string, @Body() payload: any): Promise<ResponseHttpModel> {
    const result = await this.resultService.createCoordinatorEvaluationResults(coordinatorEvaluationId, payload);

    return {
      data: result,
      message: 'Resultado creado exitosamente',
      title: 'Resultado Creado',
    };
  }
}
