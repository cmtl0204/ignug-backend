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
import { CareersService } from '@core/services';
import { CreateCareerDto, UpdateCareerDto } from '@core/dto';

@Controller('careers')
export class CareersController {
  constructor(private careersService: CareersService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() params: any) {
    const response = this.careersService.findAll();
    return response;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const response = this.careersService.findOne(id);
    return response;
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCareerDto) {
    const response = this.careersService.create(payload);
    return response;
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCareerDto,
  ) {
    const response = this.careersService.update(id, payload);
    return response;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    const response = this.careersService.remove(id);
    return response;
  }
}
