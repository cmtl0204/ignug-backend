import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateInstitutionDto, FilterInstitutionDto, UpdateInstitutionDto } from '@core/dto';
import { InstitutionEntity } from '@core/entities';
import { InstitutionsService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Institutions')
@Controller('institutions')
export class InstitutionsController {
  constructor(private instituteService: InstitutionsService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateInstitutionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.create(payload);
    return {
      data: serviceResponse,
      message: `Institución Creada`,
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterInstitutionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Find all`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.findOne(id);
    return {
      data: serviceResponse,
      message: 'Find One',
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateInstitutionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.update(id, payload);
    return {
      data: serviceResponse,
      message: 'Institución Actualizada',
      title: `Actualizada`,
    };
  }

  @ApiOperation({ summary: 'Delete' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.remove(id);
    return {
      data: serviceResponse,
      message: 'Institución Eliminada',
      title: 'Eliminada',
    };
  }

  @ApiOperation({ summary: 'Delete All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: InstitutionEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.removeAll(payload);

    return {
      data: serviceResponse,
      message: 'Instituciones Eliminadas',
      title: 'Eliminadas',
    };
  }
}
