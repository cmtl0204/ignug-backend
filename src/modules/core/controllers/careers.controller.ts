import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateCareerDto, UpdateCareerDto, FilterCareerDto } from '@core/dto';
import { CareersService } from '@core/services';
import { CareerEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Careers')
@Controller('careers')
export class CareersController {
  constructor(private careersService: CareersService) {}

  @ApiOperation({ summary: 'Catalogue Careers' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catálogo carreras`,
      title: `Catálogo`,
    };
  }

  @ApiOperation({ summary: 'Create Career' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.create(payload);

    return {
      data: serviceResponse,
      message: 'Carrera fue creada',
      title: 'Carrera creada',
    };
  }

  @ApiOperation({ summary: 'Find All Careers' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findAll();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Buscar todas las carreras',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find Career' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findOne(id);

    return {
      data: serviceResponse,
      message: `Buscar carrera`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Hide' })
  @Patch(':id/hide')
  @HttpCode(HttpStatus.CREATED)
  async hide(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.hide(id);

    return {
      data: serviceResponse,
      message: `Carrera Oculto`,
      title: `Ocultado`,
    };
  }

  @ApiOperation({ summary: 'Update Career' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.update(id, payload);
    return {
      data: serviceResponse,
      message: `Carrera fue actualizada`,
      title: `Carrera actualizada`,
    };
  }

  @ApiOperation({ summary: 'Reactivate' })
  @Patch(':id/reactivate')
  @HttpCode(HttpStatus.CREATED)
  async reactivate(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.reactivate(id);

    return {
      data: serviceResponse,
      message: `Carrera Reactivado`,
      title: `Reactivado`,
    };
  }

  @ApiOperation({ summary: 'Delete Career' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.remove(id);
    return {
      data: serviceResponse,
      message: `Carrera fue eliminada`,
      title: `Carrera eliminada`,
    };
  }

  @ApiOperation({ summary: 'Delete All Careers' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: CareerEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.removeAll(payload);

    return {
      data: serviceResponse,
      message: `Carreras fueron eliminadas`,
      title: `Carreras eliminadas`,
    };
  }

  @ApiOperation({ summary: 'Find Career' })
  @Get(':id/teachers')
  @HttpCode(HttpStatus.OK)
  async findTeachersByCareer(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findTeachersByCareer(id);

    return {
      data: serviceResponse,
      message: `Buscar carrera`,
      title: `Success`,
    };
  }
}
