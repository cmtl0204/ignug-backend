import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { CreateResultDto } from '../dto/result/create-result.dto';
import { UpdateResultDto } from '../dto/result/update-result.dto';
import { FilterResultDto } from '../dto/result/filter-result.dto';
import { ResponseHttpModel } from '@shared/models';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createResultDto: CreateResultDto): Promise<ResponseHttpModel> {
    const result = await this.resultService.create(createResultDto);
    return {
      data: result,
      message: 'Resultado creado exitosamente',
      title: 'Resultado Creado',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() filter: FilterResultDto): Promise<ResponseHttpModel> {
    const { data, count } = await this.resultService.findAll(filter);
    return {
      data,
      pagination: { totalItems: count, limit: filter.limit, offset: filter.offset },
      message: 'Resultados obtenidos exitosamente',
      title: 'Resultados',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const result = await this.resultService.findOne(id);
    return {
      data: result,
      message: `Resultado con ID ${id} obtenido exitosamente`,
      title: 'Resultado',
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateResultDto: UpdateResultDto,
  ): Promise<ResponseHttpModel> {
    const result = await this.resultService.update(id, updateResultDto);
    return {
      data: result,
      message: `Resultado con ID ${id} actualizado exitosamente`,
      title: 'Resultado Actualizado',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    await this.resultService.remove(id);
    return {
      data: true,
      message: `Resultado con ID ${id} eliminado exitosamente`,
      title: 'Resultado Eliminado',
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.OK)
  async removeAll(@Body() ids: string[]): Promise<ResponseHttpModel> {
    await this.resultService.removeAll(ids);
    return {
      data: true,
      message: 'Resultados eliminados exitosamente',
      title: 'Resultados Eliminados',
    };
  }
}
