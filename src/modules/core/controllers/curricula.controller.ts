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
  findAll(@Query() params: any) {
    const response = this.curriculaService.findAll();
    return response;
    // return {
    //   data: response,
    //   message: `index`,
    // };
  }

  @ApiOperation({ summary: 'List of curricula' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const response = this.curriculaService.findOne(id);
    return response;
    //   {
    //     data: response,
    //     message: `show`,
    //   };
  }

  @ApiOperation({ summary: 'List of curricula' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCurriculumDto) {
    const response = this.curriculaService.create(payload);
    return response;

    //   return {
    //     data: response,
    //     message: `created`,
    //   };
  }
  @ApiOperation({ summary: 'actualiza la curricula' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCurriculumDto,
  ) {
    const response = this.curriculaService.update(id, payload);
    return response;
    // return {
    //   data: response,
    //   message: `updated ${id}`,
    // };
  }
  @ApiOperation({ summary: 'Borrra una curricula' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  remove(@Param('id', ParseIntPipe) id: number) {
    const response = this.curriculaService.remove(id);

    return response;
    // return {
    //   data: response,
    //   message: `deleted`,
    // };
  }
}
