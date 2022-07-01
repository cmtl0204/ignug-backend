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
import { CreateInstitutionDto, UpdateInstitutionDto } from '@core/dto';
import { InstitutionEntity } from '@core/entities';
import { InstitutionsService } from '@core/services';

@ApiTags('institutions')
@Controller('institutions')
export class InstitutionsController {
  constructor(private instituteService: InstitutionsService) {}

  @ApiOperation({ summary: 'crea un instituto' })
  @Post('')
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

  @ApiOperation({ summary: 'obtiene una lista de todos los institutos' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any): Promise<{
    data: InstitutionEntity[];
    message: string;
  }> {
    const data = await this.instituteService.findAll();
    return {
      data,
      message: `all institutions`,
    };
  }

  @ApiOperation({ summary: 'obtiene un instituto' })
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

  @ApiOperation({ summary: 'actualiza un instituto' })
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

  @ApiOperation({ summary: 'elimina un instituto' })
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
}
