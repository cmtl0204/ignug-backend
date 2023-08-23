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
import { CreateTeacherDistributiveDto, UpdateTeacherDistributiveDto, FilterTeacherDistributiveDto } from '@core/dto';
import { TeacherDistributivesService } from '@core/services';
import { TeacherDistributiveEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Teacher Distributive')
@Controller('teacher-distributives')
export class TeacherDistributivesController {
  constructor(private teacherDistributivesService: TeacherDistributivesService) {}

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributivesService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catálogo`,
      title: `Catálogo`,
    };
  }

  @ApiOperation({ summary: 'Create' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateTeacherDistributiveDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributivesService.create(payload);

    return {
      data: serviceResponse,
      message: 'fue creada',
      title: 'creada',
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterTeacherDistributiveDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributivesService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Buscar todas las ',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributivesService.findOne(id);

    return {
      data: serviceResponse,
      message: `Buscar`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateTeacherDistributiveDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributivesService.update(id, payload);
    return {
      data: serviceResponse,
      message: `fue actualizada`,
      title: `actualizada`,
    };
  }

  @ApiOperation({ summary: 'Delete' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributivesService.remove(id);
    return {
      data: serviceResponse,
      message: `fue eliminada`,
      title: `eliminada`,
    };
  }

  @ApiOperation({ summary: 'Delete All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: TeacherDistributiveEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributivesService.removeAll(payload);

    return {
      data: serviceResponse,
      message: `fueron eliminadas`,
      title: `eliminadas`,
    };
  }
}
