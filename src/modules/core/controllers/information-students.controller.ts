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

import { InformationStudentsService } from '@core/services';

import {
  CreateInformationStudentDto,
  FilterInformationStudentDto,
  UpdateInformationStudentDto,
} from '@core/dto';
import { InformationStudentEntity } from '@core/entities';

@ApiTags('information-students')
@Controller('information-students')
export class InformationStudentsController {
  constructor(private informationstudentsService: InformationStudentsService) {}

  @ApiOperation({ summary: 'Create information students' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateInformationStudentDto) {
    const data = await this.informationstudentsService.create(payload);

    return {
      data,
      message: 'created',
    };
  }

  @ApiOperation({ summary: 'List of information students' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterInformationStudentDto) {
    const response = await this.informationstudentsService.findAll(params);
    //const sortFields = params.sort
    // ? params.sort.split(',').filter((sort) => sort != '')
    //: null;
    //const selectedFields = params.fields
    // ? params.fields.split(',').filter((field) => field != '')
    // : null;
    //const data = await this.informationTeachersService.findAll();
    return {
      data: response.data,
      pagination: response.pagination,
      message: `index`,
    };
  }

  @ApiOperation({ summary: 'View one information students' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.informationstudentsService.findOne(id);

    return {
      data,
      message: `show ${id}`,
    };
  }

  @ApiOperation({ summary: 'Update information students' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInformationStudentDto,
  ) {
    const data = await this.informationstudentsService.update(id, payload);

    return {
      data: data,
      message: `updated ${id}`,
    };
  }

  @ApiOperation({ summary: 'Remove information students' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.informationstudentsService.remove(id);
    return {
      data,
      message: `informationStudent deleted ${id}`,
    };
  }

  @ApiOperation({ summary: 'Remove All Users' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: InformationStudentEntity[]) {
    const data = await this.informationstudentsService.removeAll(payload);

    return {
      data,
      message: `InformationStudents deleted`,
      title: `Deleted`,
    } 
  }
}
