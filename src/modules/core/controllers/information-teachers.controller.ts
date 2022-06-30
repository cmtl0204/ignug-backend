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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateInformationTeacherDto,
  UpdateInformationTeacherDto,
} from '@core/dto';
import { InformationTeachersService } from '@core/services';

@ApiTags('information-teachers')
@Controller('information-teachers')
export class InformationTeachersController {
  constructor(private informationTeachersService: InformationTeachersService) {}

  @ApiOperation({ summary: 'Crea un nuevo docente' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateInformationTeacherDto) {
    const response = this.informationTeachersService.create(payload);
    return response;
  }

  @ApiOperation({ summary: 'Consulta los docentes' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any) {
    const response = this.informationTeachersService.findAll();
    return response;
  }

  @ApiOperation({ summary: 'Consulta un solo docente' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const response = this.informationTeachersService.findOne(id);
    return response;
  }

  @ApiOperation({ summary: 'Elimina un docente' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = this.informationTeachersService.remove(id);
    return {
      data: response,
      message: `deleted`,
    };
  }

  @ApiOperation({ summary: 'Actualiza un la informacion del docente' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInformationTeacherDto,
  ) {
    const response = await this.informationTeachersService.update(id, payload);
    return {
      data: response,
      message: `updated ${id}`,
    };
  }
}
