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
    const data = await this.informationTeachersService.create(payload);

    return {
      data,
      message: `create`,
    };  
  }

  @ApiOperation({ summary: 'Elimina un docente' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.informationTeachersService.remove(id);
    return {
      data,
      message: `deleted`,
    };
  }

  @ApiOperation({ summary: 'Consulta los docentes' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any) {
    const data = await this.informationTeachersService.findAll();
    return {
      data,
      message: `findall`,
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
    };  }


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
      message: `updated ${id}`,
    };
  }
}
