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
  CreateInformationStudentDto,
  FilterInformationStudentDto,
  UpdateInformationStudentDto,
} from '@core/dto';
import { InformationStudentEntity } from '@core/entities';
import { InformationStudentsService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Information Students')
@Controller('information-students')
export class InformationStudentsController {
  constructor(private informationStudentsService: InformationStudentsService) {}

  @ApiOperation({ summary: 'Crear información estudiantes' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateInformationStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.create(
      payload,
    );

    return {
      data: serviceResponse,
      message: 'creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Lista de la información estudiantes' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterInformationStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.findAll(
      params,
    );
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Éxito',
    };
  }

  @ApiOperation({ summary: 'Ver una información estudiantes' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.findOne(id);
    return {
      data: serviceResponse,
      message: `show ${id}`,
      title: `Éxito`,
    };
  }

  @ApiOperation({ summary: 'Actualizar información de los estudiantes' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateInformationStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse,
      message: `Información Estudiante actualizada ${id}`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Quitar información estudiantes' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.remove(id);
    return {
      data: serviceResponse,
      message: `Información Estudiante eliminado ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Eliminar toda la información de los estudiantes' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: InformationStudentEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.removeAll(
      payload,
    );

    return {
      data: serviceResponse,
      message: `Información Estudiantes eliminados`,
      title: `Eliminado`,
    };
  }
}
