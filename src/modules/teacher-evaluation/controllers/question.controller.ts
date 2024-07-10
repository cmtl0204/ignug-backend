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

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createQuestionDto: CreateQuestionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.questionService.create(createQuestionDto);
    return {
      data: serviceResponse.data,
      message: 'Question created successfully',
      title: 'Question Created',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterQuestionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.questionService.findAll(params);
    return {
      data: serviceResponse.data,
      message: 'Questions retrieved successfully',
      title: 'Questions Retrieved',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.questionService.findOne(id);
    return {
      data: serviceResponse.data,
      message: `Question ${id} retrieved successfully`,
      title: 'Question Retrieved',
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateQuestionDto: UpdateQuestionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.questionService.update(id, updateQuestionDto);
    return {
      data: serviceResponse.data,
      message: `Question ${id} updated successfully`,
      title: 'Question Updated',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.questionService.remove(id);
  }
}
