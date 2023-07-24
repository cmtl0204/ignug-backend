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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateSchoolPeriodDto,
  FilterSchoolPeriodDto,
  UpdateSchoolPeriodDto,
} from '@core/dto';
import { SchoolPeriodsService } from '@core/services';
import { SchoolPeriodEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';
import { Auth, Roles } from '@auth/decorators';
import { RoleEnum } from '@auth/enums';

@ApiTags('School Period')
@Controller('school-periods')
@Auth()
export class SchoolPeriodsController {
  constructor(private schoolPeriodsService: SchoolPeriodsService) {}

  @ApiOperation({ summary: 'Catalogue' })
  @Roles(RoleEnum.GUEST)
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue`,
      title: `Catalogue`,
    };
  }

  @ApiOperation({ summary: 'Create' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateSchoolPeriodDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.create(payload);

    return {
      data: serviceResponse,
      message: 'Periodo Lectivo Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Roles(RoleEnum.GUEST)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterSchoolPeriodDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.findAll(params);

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
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.findOne(id);

    return {
      data: serviceResponse,
      message: `Find One`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Hide' })
  @Patch(':id/hide')
  @HttpCode(HttpStatus.CREATED)
  async hide(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.hide(id);

    return {
      data: serviceResponse,
      message: `Periodo Lectivo Oculto`,
      title: `Ocultado`,
    };
  }

  @ApiOperation({ summary: 'Update' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateSchoolPeriodDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.update(id, payload);
    return {
      data: serviceResponse,
      message: `Periodo Lectivo Actualizado`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Reactivate' })
  @Patch(':id/reactivate')
  @HttpCode(HttpStatus.CREATED)
  async reactivate(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.reactivate(id);

    return {
      data: serviceResponse,
      message: `Periodo Lectivo Reactivado`,
      title: `Reactivado`,
    };
  }

  @ApiOperation({ summary: 'Delete' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.remove(id);
    return {
      data: serviceResponse,
      message: `Periodo Lectivo Eliminado`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Delete All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: SchoolPeriodEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.removeAll(payload);

    return {
      data: serviceResponse,
      message: `Periodos Lectivos Eliminados`,
      title: `Eliminados`,
    };
  }

  @ApiOperation({ summary: 'Open' })
  @Patch(':id/open')
  @HttpCode(HttpStatus.CREATED)
  async open(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.open(id);

    return {
      data: serviceResponse,
      message: `Periodo Lectivo Abierto`,
      title: `Abierto`,
    };
  }

  @ApiOperation({ summary: 'Close' })
  @Patch(':id/close')
  @HttpCode(HttpStatus.CREATED)
  async close(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.schoolPeriodsService.close(id);

    return {
      data: serviceResponse,
      message: `Periodo Lectivo Cerrado`,
      title: `Cerrado`,
    };
  }
}
