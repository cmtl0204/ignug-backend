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
  create(@Body() payload: CreateCareerDto) {
    const response = this.careersService.create(payload);
    return response;
  }
  @ApiOperation({ summary: 'Busca todas las carreras' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() params: any) {
    const response = this.careersService.findAll();
    return response;
  }
  @ApiOperation({ summary: 'Filtra una carrera' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const response = this.careersService.findOne(id);
    return response;
  }
  @ApiOperation({ summary: 'Actualiza una carrera' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCareerDto,
  ) {
    const response = this.careersService.update(id, payload);
    return response;
  }
  @ApiOperation({ summary: 'Borra una carrera' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    const response = this.careersService.remove(id);
    return response;
  }
}
