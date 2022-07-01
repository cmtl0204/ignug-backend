import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CareersService } from '@core/services';
import { CreateCareerDto, UpdateCareerDto } from '@core/dto';
@ApiTags('careers')
@Controller('careers')
export class CareersController {
  constructor(private careersService: CareersService) {}
  @ApiOperation({ summary: 'Crea una nueva carrera' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCareerDto) {
    const data = await this.careersService.create(payload);
    return {
      data,
      message: 'Carrera creada correctamente',
    };
  }
  @ApiOperation({ summary: 'Busca todas las carreras' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any) {
    const data = await this.careersService.findAll();
    return {
      data,
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
      message: 'Carrera encontrada correctamente',
    };
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
      message: 'Carrera actualizada correctamente',
    };
  }
  @ApiOperation({ summary: 'Borra una carrera' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.careersService.remove(id);
    return {
      data,
      message: 'Carrera borrada correctamente',
    };
  }
}
