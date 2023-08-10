import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateCurriculumDto, CreateCurriculumDto, FilterCurriculumDto } from '@core/dto';
import { CurriculumEntity } from '@core/entities';
import { CurriculumsService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Curriculums')
@Controller('curriculums')
export class CurriculumsController {
  constructor(private curriculumsService: CurriculumsService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCurriculumDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.create(payload);

    return {
      data: serviceResponse,
      message: 'Malla curricular creada',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterCurriculumDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Find all',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.findOne(id);

    return {
      data: serviceResponse,
      message: 'Find One',
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateCurriculumDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.update(id, payload);

    return {
      data: serviceResponse,
      message: 'Malla curricular actualizada',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Delete' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.remove(id);

    return {
      data: serviceResponse,
      message: 'Malla curricular eliminada',
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Delete All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: CurriculumEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculumsService.removeAll(payload);

    return {
      data: serviceResponse,
      message: 'Mallas curriculares eliminadas',
      title: 'Eliminadas',
    };
  }
}
