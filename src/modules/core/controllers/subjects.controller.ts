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
  constructor(private subjectsService: SubjectsService) {}

  @ApiOperation({ summary: 'Create subjects' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateSubjectDto) {
    const response = this.subjectsService.create(payload);
    return response;
  }

  @ApiOperation({ summary: 'List of subjects' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() params: any) {
    const response = this.subjectsService.findAll();
    return response;
  }

  @ApiOperation({ summary: 'View one subjects' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const response = this.subjectsService.findOne(id);
    return response;
  }

  @ApiOperation({ summary: 'Update subjects' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSubjectDto,
  ) {
    const response = this.subjectsService.update(id, payload);
    return response;
  }

  @ApiOperation({ summary: 'Remove subjects' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  remove(@Param('id', ParseIntPipe) id: number) {
    const response = this.subjectsService.remove(id);
    return response;
  }
}
