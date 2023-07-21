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
import { CreateEventDto, FilterEventDto, UpdateEventDto } from '@core/dto';
import { EventsService } from '@core/services';
import { EventEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.catalogue();

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
  async create(@Body() payload: CreateEventDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.create(payload);

    return {
      data: serviceResponse,
      message: 'Evento Creado',
      title: 'Creación',
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterEventDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.findAll(params);

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
    const serviceResponse = await this.eventsService.findOne(id);

    return {
      data: serviceResponse,
      message: `Find One`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateEventDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.update(id, payload);
    return {
      data: serviceResponse,
      message: `Evento Actualizado`,
      title: `Actualización`,
    };
  }

  @ApiOperation({ summary: 'Delete' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.remove(id);
    return {
      data: serviceResponse,
      message: `Evento Eliminado`,
      title: `Eliminación`,
    };
  }

  @ApiOperation({ summary: 'Delete All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: EventEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.removeAll(payload);

    return {
      data: serviceResponse,
      message: `Eventos Eiminados`,
      title: `Eliminaciones`,
    };
  }
}
