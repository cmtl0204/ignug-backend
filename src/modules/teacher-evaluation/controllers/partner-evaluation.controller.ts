import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { PartnerEvaluationService } from '../services/partner-evaluation.service';

@ApiTags('Questions')
@Controller('teacher-evaluations/partner-evaluations')
export class PartnerEvaluationController {
  constructor(private readonly partnerEvaluationService: PartnerEvaluationService) {
  }

  @ApiOperation({ summary: 'findPartnerEvaluationByEvaluator' })
  @Get('evaluators/:evaluatorId')
  @HttpCode(HttpStatus.OK)
  async findPartnerEvaluationByEvaluator(
    @Param('evaluatorId', ParseUUIDPipe) evaluatorId: string,
    @Query('schoolPeriodId', ParseUUIDPipe) schoolPeriodId: string
    ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.partnerEvaluationService.findPartnerEvaluationByEvaluator(evaluatorId,schoolPeriodId);

    return {
      data: serviceResponse,
      message: 'La encuesta creada exitosamente',
      title: 'Encuesta Realizada',
    };
  }
}
