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
import { DeleteResult } from 'typeorm';
import {
  CreateInstitutionDto,
  FilterInstitutionDto,
  UpdateInstitutionDto,
} from '@core/dto';
import { InstitutionEntity } from '@core/entities';
import { InstitutionsService } from '@core/services';
import { ResponseHttpModel } from '@exceptions';

@ApiTags('institutions')
@Controller('institutions')
export class InstitutionsController {
  constructor(private instituteService: InstitutionsService) {}

  @ApiOperation({ summary: 'create Institution' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateInstitutionDto): Promise<{
    data: InstitutionEntity;
    message: string;
  }> {
    const data = await this.instituteService.create(payload);
    return {
      data: data,
      message: `created institution`,
    };
  }

  @ApiOperation({ summary: 'get all institutions' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterInstitutionDto) {
    const data = await this.instituteService.findAll(params);
    return {
      data,
      message: `all institutions`,
    };
  }

  @ApiOperation({ summary: 'get institution' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<{
    data: InstitutionEntity;
    message: string;
  }> {
    const data = await this.instituteService.findOne(id);
    return {
      data,
      message: `show institution ${id}`,
    };
  }

  @ApiOperation({ summary: 'update institution' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInstitutionDto,
  ): Promise<{
    data: InstitutionEntity;
    message: string;
  }> {
    const data = await this.instituteService.update(id, payload);
    return {
      data,
      message: `updated institution ${id}`,
    };
  }

  @ApiOperation({ summary: 'delete institution' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{
    data: DeleteResult;
    message: string;
  }> {
    const data = await this.instituteService.remove(id);
    return {
      data,
      message: `deleted institution ${id}`,
    };
  }

  @ApiOperation({ summary: 'remove all institutos' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: InstitutionEntity[]) {
    const data = await this.instituteService.removeAll(payload);

    return {
      data,
      message: `Users deleted`,
      title: `Deleted`,
    } as ResponseHttpModel;
  }
}
