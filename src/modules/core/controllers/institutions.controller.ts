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
import { DeleteResult } from 'typeorm';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InstitutionEntity } from './entities/institution.entity';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {
  constructor(private instituteService: InstitutionsService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateInstitutionDto): Promise<{
    data: InstitutionEntity;
    message: string;
  }> {
    const institution = await this.instituteService.create(payload);
    return {
      data: institution,
      message: `created institution`,
    };
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any): Promise<{
    data: InstitutionEntity[];
    message: string;
  }> {
    const institutions = await this.instituteService.findAll();
    return {
      data: institutions,
      message: `all institutions`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<{
    data: InstitutionEntity;
    message: string;
  }> {
    const institution = await this.instituteService.findOne(id);
    return {
      data: institution,
      message: `show institution ${id}`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInstitutionDto,
  ): Promise<{
    data: InstitutionEntity;
    message: string;
  }> {
    const institution = await this.instituteService.update(id, payload);
    return {
      data: institution,
      message: `updated institution ${id}`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{
    data: DeleteResult;
    message: string;
  }> {
    const institution = await this.instituteService.remove(id);
    return {
      data: institution,
      message: `deleted institution ${id}`,
    };
  }
}
