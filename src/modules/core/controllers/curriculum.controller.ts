import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  UpdateCurriculumDto,
  CreateCurriculumDto,
  FilterCurriculumDto,
} from '@core/dto';
import { CurriculumEntity } from '@core/entities';
import { CurriculumsService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Curriculum')
@Controller('curriculum')
export class CurriculumController {
  constructor(private curriculumsService: CurriculumsService) {}

  @ApiOperation({ summary: 'Create Curriculum' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateCurriculumDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.create(payload);

    return {
      data: serviceResponse,
      message: 'The curriculum was created',
      title: 'Curriculum Created',
    };
  }

  @ApiOperation({ summary: 'Find All Curriculum' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterCurriculumDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Find all curriculums',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find Curriculum' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.findOne(id);

    return {
      data: serviceResponse,
      message: 'Find curriculum',
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update Curriculum' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateCurriculumDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.update(id, payload);

    return {
      data: serviceResponse,
      message: 'The curriculum was updated',
      title: 'Curriculum Updated',
    };
  }

  @ApiOperation({ summary: 'Delete Curriculum' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.remove(id);

    return {
      data: serviceResponse,
      message: 'The curriculum was deleted',
      title: `Curriculum Deleted`,
    };
  }

  @ApiOperation({ summary: 'Delete All Curriculum' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CurriculumEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.removeAll(payload);

    return {
      data: serviceResponse,
      message: 'The curriculum was deleted',
      title: 'Curriculum Deleted',
    };
  }
}
