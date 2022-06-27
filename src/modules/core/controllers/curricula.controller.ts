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
import { ApiTags,ApiOperation } from '@nestjs/swagger';
import { CurriculaServic } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curricula.dto';


@Controller('curricula')
export class CurriculaController {
  constructor(private curriculaService:CurriculaServic) {}

  
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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const response = this.curriculaService.findOne(id);

    return  response;
  //   {
  //     data: response,
  //     message: `show`,
  //   };
 }
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload:CreateCurriculumDto) {
    const response = this.curriculaService.create(payload);
  return response;
  
    //   return {
  //     data: response,
  //     message: `created`,
  //   };
  }

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