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
import { EvaluationService } from '../services/evaluation.service';
import { CreateEvaluationDto } from '../dto/evaluation/create-evaluation.dto';
import { UpdateEvaluationDto } from '../dto/evaluation/update-evaluation.dto';
import { FilterEvaluationDto } from '../dto/evaluation/filter-evaluation.dto';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Evaluations')
@Controller('teacher-evaluations/evaluations')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEvaluationDto: CreateEvaluationDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationService.create(createEvaluationDto);
    return {
      data: serviceResponse.data,
      message: 'Evaluación creada exitosamente',
      title: 'Evaluación Creada',
    };
  }

  @Get('find/all')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterEvaluationDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationService.findAll(params);
    return {
      data: serviceResponse.data,
      message: 'Evaluaciones obtenidas exitosamente',
      title: 'Evaluaciones',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationService.findOne(id);
    return {
      data: serviceResponse.data,
      message: `Evaluación con ID ${id} obtenida exitosamente`,
      title: 'Evaluación',
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEvaluationDto: UpdateEvaluationDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationService.update(id, updateEvaluationDto);
    return {
      data: serviceResponse.data,
      message: `Evaluación con ID ${id} actualizada exitosamente`,
      title: 'Evaluación Actualizada',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    await this.evaluationService.remove(id);
    return {
      data: null,
      message: `Evaluación con ID ${id} eliminada exitosamente`,
      title: 'Evaluación Eliminada',
    };
  }

}
