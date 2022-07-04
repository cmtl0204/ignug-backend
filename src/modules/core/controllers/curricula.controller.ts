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
import { CurriculaService } from '@core/services';
import { UpdateCurriculumDto, CreateCurriculumDto } from '@core/dto';

@ApiTags('curricula')
@Controller('curricula')
export class CurriculaController {
  constructor(private curriculaService: CurriculaService) {}

  @ApiOperation({ summary: 'List of curricula' })
  @Get('')
  @HttpCode(HttpStatus.OK)
 async findAll(@Query() params: any) {
    const data = await this.curriculaService.findAll();
    return{
    data,
       message: `index`,
   };
  }

  @ApiOperation({ summary: 'List of curricula' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const response = await this.curriculaService.findOne(id);
    return {
   
     data: response,
         message: `show`,
     };
  }

  @ApiOperation({ summary: 'List of curricula' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCurriculumDto) {
    const response = await this.curriculaService.create(payload);
    return {
      data: response,
     message: `created`,
   };
  }
  @ApiOperation({ summary: 'actualiza la curricula' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCurriculumDto,
  ) {
    const response = await this.curriculaService.update(id, payload);
    return {
      data: response,
      message: `updated ${id}`,
    };
  }
  @ApiOperation({ summary: 'Borrra una curricula' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.curriculaService.remove(id);
     return {
     data: response,
     message: `deleted`,
     };
  }
}
