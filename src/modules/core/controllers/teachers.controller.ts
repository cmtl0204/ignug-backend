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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateTeacherDto } from '@core/dto';
import { UpdateTeacherDto } from '@core/dto';
import { TeachersService } from '@core/services';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  store(@Body() payload: CreateTeacherDto) {
    const response = this.teachersService.create(payload);
    return {
      data: response,
      message: `created teacher`,
    };
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  index(@Query() params: any) {
    const response = this.teachersService.findAll();
    return {
      data: response,
      message: `index`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  show(@Param('id', ParseIntPipe) id: number) {
    const response = this.teachersService.findOne(id);
    return {
      data: response,
      message: `show`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTeacherDto,
  ) {
    const response = this.teachersService.update(id, payload);
    return {
      data: response,
      message: `updated ${id}`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  destroy(@Param('id', ParseIntPipe) id: number) {
    const response = this.teachersService.delete(id);
    return {
      data: response,
      message: `deleted`,
    };
  }
}
