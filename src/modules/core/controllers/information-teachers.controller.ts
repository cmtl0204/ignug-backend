import {
  Controller,
  Body,
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
import { CreateInformationTeacherDto} from '@core/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InformationTeachersService } from '@core/services';

@ApiTags('information-teachers')
@Controller('informationTeachers')
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
  async findAll(@Query() params: any) {
    const sortFields = params.sort
      ? params.sort.split(',').filter((sort) => sort != '')
      : null;
    const selectedFields = params.fields
      ? params.fields.split(',').filter((field) => field != '')
      : null;
    const data = await this.informationTeachersService.findAll();
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
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
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

 
}
