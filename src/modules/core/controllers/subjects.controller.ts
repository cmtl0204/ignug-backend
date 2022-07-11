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
import { CreateSubjectDto, UpdateSubjectDto, FilterSubjectDto} from '@core/dto';
import { SubjectsService } from '@core/services';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @ApiOperation({ summary: 'Create subjects' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateSubjectDto) {
    const data = await this.subjectsService.create(payload);
    return {
      data,
      message: 'created',
    };
  }

  @ApiOperation({ summary: 'List of subjects' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterSubjectDto) {
    const data = await this.subjectsService.findAll(params)
     //const sortFields = params.sort
    // ? params.sort.split(',').filter((sort) => sort != '')
    //: null;
    //const selectedFields = params.fields
    // ? params.fields.split(',').filter((field) => field != '')
    // : null;
    //const data = await this.subjectsService.findAll();
    return {
      data,
      message: `index`,
    };
  }

  @ApiOperation({ summary: 'View one subjects' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.subjectsService.findOne(id);
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
    const data = await this.subjectsService.update(id, payload);
    return {
      data: data,
      message: `subject updated ${id}`,
    };
  }

  @ApiOperation({ summary: 'Remove subjects' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.subjectsService.remove(id);
    return {
      data,
      message: `subject deleted ${id}`,
    };
  }
}
