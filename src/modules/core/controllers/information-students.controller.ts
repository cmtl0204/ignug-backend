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

import { InformationStudentsService } from '@core/services';

import {
  CreateInformationStudentDto,
  UpdateInformationStudentDto,
} from '@core/dto';

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
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any) {
    const data = await this.informationstudentsService.findAll();

    return {
      data,
      message: `index`,
    };
  }

  @ApiOperation({ summary: 'View one information students' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await  this.informationstudentsService.findOne(id);

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
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.informationstudentsService.remove(id);
    return {
      data: data,
      message: `deleted ${id}`,
    };
  }
}
