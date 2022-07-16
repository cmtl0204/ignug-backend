import {
  Controller,
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateInformationTeacherDto,
  UpdateInformationTeacherDto,
  FilterInformationTeacherDto,
} from '@core/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InformationTeachersService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';
import { InformationTeacherEntity } from '../entities/information-teacher.entity';

@ApiTags('information-teachers')
@Controller('information-teachers')
export class InformationTeachersController {
  constructor(private informationTeachersService: InformationTeachersService) {}

  @ApiOperation({ summary: 'Crea un nuevo docente' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateInformationTeacherDto) {
    const data = await this.informationTeachersService.create(payload);

    return {
      data,
      message: `created`,
    };
  }

  @ApiOperation({ summary: 'Consulta los docentes' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterInformationTeacherDto) {
    const data = await this.informationTeachersService.findAll(params);
    return {
      data,
      message: `index`,
    };
  }

  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  catalogue(@Query() params: any) {
    const selectedFields = params.fields
      ? params.fields.split(',').filter((field) => field != '')
      : null;
    return {
      data: 'data',
      message: `catalogue`,
    };
  }

  @ApiOperation({ summary: 'Filtrar usuarios' })
  @Get('filter')
  @HttpCode(HttpStatus.OK)
  filter(@Query() params: any) {
    const search = params.search
      ? params.search.split(',').filter((search) => search != '')
      : null;
    return {
      data: 'data',
      message: `filter`,
    };
  }

  @ApiOperation({ summary: 'Consulta un solo docente' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.informationTeachersService.findOne(id);
    return {
      data,
      message: `show ${id}`,
    };
  }

  @ApiOperation({ summary: 'Actualiza un la informacion del docente' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInformationTeacherDto,
  ) {
    const data = await this.informationTeachersService.update(id, payload);
    return {
      data,
      message: `informationTeacher updated ${id}`,
    };
  }

  @ApiOperation({ summary: 'Elimina un docente' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.informationTeachersService.remove(id);
    return {
      data,
      message: `informationTeacher deleted ${id}`,
    };
  }
  @ApiOperation({ summary: 'Remueve todos los informationTeachers' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: InformationTeacherEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Users deleted`,
      title: `Deleted`,
    };
  }
}
