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
import { CareersService } from '@core/services';
import { CreateCareerDto, UpdateCareerDto, FilterCareerDto } from '@core/dto';
import { roles, AppRoles } from '../../../app.roles';
import { ResponseHttpModel } from '@exceptions';
import { CareerEntity } from '@core/entities';

@ApiTags('careers')
@Controller('careers')
export class CareersController {
  constructor(private careersService: CareersService) {}

  @ApiOperation({ summary: 'Catalogue of Users' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue() {
    const response = await this.careersService.catalogue();
    return {
      data: response.data,
      message: `catalogue`,
      title: `Catalogue`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'Crea una nueva carrera' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCareerDto) {
    const data = await this.careersService.create({
      ...payload,
      roles: [AppRoles.ADMIN],
    });
    return {
      data,
      message: 'Nueva carrera creada correctamente',
    };
  }

  @ApiOperation({ summary: 'Busca todas las carreras' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterCareerDto) {
    const response = await this.careersService.findAll(params);
    return {
      data: response.data,
      pagination: response.pagination,
      message: 'Carreras encontradas correctamente',
    };
  }

  @ApiOperation({ summary: 'Filtra una carrera' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.careersService.findOne(id);
    return {
      data,
      message: `Mostrando ${id}`,
      title: `Success`,
    }as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'Actualiza una carrera' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCareerDto,
  ) {
    const data = await this.careersService.update(id, payload);
    return {
      data,
      message: `Actualizada la carrera ${id}`,
      title: `Updated`,
    }as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'Borra una carrera' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.careersService.remove(id);
    return {
      data,
      message: `Eliminada la carrera ${id}`,
      title: `Deleted`,
    }as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'Remove All Users' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: CareerEntity[]) {
    const data = await this.careersService.removeAll(payload);

    return {
      data,
      message: `Carrera eliminada correctamente`,
      title: `Deleted`,
    } as ResponseHttpModel;
  }
}
