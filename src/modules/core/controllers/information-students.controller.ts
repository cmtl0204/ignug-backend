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

  @ApiOperation({ summary: 'List of information students' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() params: any) {
    const response = this.informationstudentsService.findAll();

    return response;
  }

  @ApiOperation({ summary: 'View one information students' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const response = this.informationstudentsService.findOne(id);

    return response;
  }

  @ApiOperation({ summary: 'Create information students' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateInformationStudentDto) {
    const response = this.informationstudentsService.create(payload);

    return response;
  }

  @ApiOperation({ summary: 'Update information students' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInformationStudentDto,
  ) {
    const response = this.informationstudentsService.update(id, payload);

    return response;
  }

  @ApiOperation({ summary: 'Remove information students' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  delete(@Param('id', ParseIntPipe) id: number) {
    const response = this.informationstudentsService.remove(id);

    return response;
  }
}
