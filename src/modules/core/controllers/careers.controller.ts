import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateCareerDto, UpdateCareerDto, FilterCareerDto } from '@core/dto';
import { CareersService } from '@core/services';
import { CareerEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';
import { AppRoles } from '../../../app.roles';

@ApiTags('careers')
@Controller('careers')
export class CareersController {
  constructor(private careersService: CareersService) {}

  @ApiOperation({ summary: 'Catalogue of Users' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  @ApiOperation({ summary: 'Crea una nueva carrera' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.create({
      ...payload,
      roles: [AppRoles.ADMIN],
    });

    return {
      data: serviceResponse.data,
      message: 'Career created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Busca todas las carreras' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Carreras encontradas correctamente',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Filtra una carrera' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findOne(id);
    
    return {
      data: serviceResponse.data,
      message: `Carrera encontrada correctamente`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Actualiza una carrera' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: `Carrera actualizada correctamente`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Borra una carrera' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Carrera eliminada correctamente`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Borra todas las carreras' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: CareerEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Carreras eliminadas correctamente`,
      title: `Deleted`,
    };
  }
}
