import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SubjectsService } from '@core/services';
import {
  CreateSubjectDto,
  FilterSubjectDto,
  UpdateSubjectDto,
} from '@core/dto';
import { SubjectEntity } from '@core/entities';
import { ResponseHttpModel } from '@exceptions';

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
    const response = await this.subjectsService.findAll(params);
    return {
      data: response.data,
      pagination: response.pagination,
      message: `index`,
    };
  }

  @ApiOperation({ summary: 'Find Subject' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.subjectsService.findOne(id);
    return {
      data,
      message: `show ${id}`,
      title: `Success`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'Update Subject' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSubjectDto,
  ) {
    const data = await this.subjectsService.update(id, payload);

    return {
      data: data,
      message: `Subject updated ${id}`,
      title: `Updated`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'Remove Subject' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.subjectsService.remove(id);

    return {
      data,
      message: `Subject deleted ${id}`,
      title: `Deleted`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'Remove All SubjectS' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: SubjectEntity[]) {
    const data = await this.subjectsService.removeAll(payload);

    return {
      data,
      message: `Subjects deleted`,
      title: `Deleted`,
    } as ResponseHttpModel;
  }
}
