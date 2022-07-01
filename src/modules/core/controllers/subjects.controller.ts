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
import { CreateSubjectDto, UpdateSubjectDto } from '@core/dto';
import { SubjectsService } from '@core/services';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) { }

  @ApiOperation({ summary: 'Create subjects' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateSubjectDto) {
    const data = this.subjectsService.create(payload);
    return {
      data,
      message: 'created',
    };
  }

  @ApiOperation({ summary: 'List of subjects' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any) {
    const data = this.subjectsService.findAll();
    return {
      data,
      message: `index`,
    };
  }

  @ApiOperation({ summary: 'View one subjects' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = this.subjectsService.findOne(id);
    return {
      data,
      message: `show ${id}`,
    };
  }

  @ApiOperation({ summary: 'Update subjects' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSubjectDto,
  ) {
    const data = this.subjectsService.update(id, payload);
    return {
      data: data,
      message: `updated ${id}`,
    };
  }

  @ApiOperation({ summary: 'Remove subjects' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = this.subjectsService.remove(id);
    return {
      data,
      message: `deleted ${id}`,
    };
  }
}
