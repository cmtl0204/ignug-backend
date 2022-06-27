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
import { CreateInformationStudentDto } from './dtos/create-information-student.dto';
import { UpdateInformationStudentDto } from './dtos/update-information-student.dto';
import { InformationStudentsService } from './information-students.service';

@Controller('information-students')
export class InformationStudentsController {
  constructor(private informationstudentsService:InformationStudentsService ) {}
  
  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() params: any) {
    const response = this.informationstudentsService.findAll();

    return response;
    // return {
    //   data: response,
    //   message: `index`,
    // };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const response = this.informationstudentsService.findOne(id);
    return response;
    // return {
    //   data: response,
    //   message: `show`,
    // };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateInformationStudentDto) {
    const response = this.informationstudentsService.create(payload);
    return response;
    // return {
    //   data: response,
    //   message: `created`,
    // };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInformationStudentDto,
  ) {
    const response = this.informationstudentsService.update(id, payload);
    return response;
    // return {
    //   data: response,
    //   message: `updated ${id}`,
    // };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  delete(@Param('id', ParseIntPipe) id: number) {
    const response = this.informationstudentsService.delete(id);
    return response;
    // return {
    //   data: response,
    //   message: `deleted`,
    // };
  }
}


  