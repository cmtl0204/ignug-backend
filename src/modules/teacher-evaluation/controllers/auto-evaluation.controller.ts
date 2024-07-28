import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../dto/question/create-question.dto';
import { UpdateQuestionDto } from '../dto/question/update-question.dto';
import { FilterQuestionDto } from '../dto/question/filter-question.dto';
import { ResponseHttpModel } from '@shared/models';
import { AutoEvaluationService } from '../services/auto-evaluation.service';

@ApiTags('Questions')
@Controller('teacher-evaluations/auto-evaluations')
export class AutoEvaluationController {
  constructor(private readonly autoEvaluationService: AutoEvaluationService) {
  }

  @Get('evaluated/:evaluatedId')
  @HttpCode(HttpStatus.OK)
  async create(@Param('evaluatedId', ParseUUIDPipe) evaluatedId: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.autoEvaluationService.findAutoEvaluationByEvaluated(evaluatedId);

    return {
      data: serviceResponse,
      message: 'La encuesta creada exitosamente',
      title: 'Encuesta Realizada',
    };
  }
}
