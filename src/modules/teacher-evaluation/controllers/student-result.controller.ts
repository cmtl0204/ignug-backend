import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ResponseHttpModel } from '@shared/models';
import { StudentResultService } from '../services/student-result.service';
import { CreateStudentResultDto } from '../dto/student-result/create-student-result.dto';
import { UpdateStudentResultDto } from '../dto/student-result/update-student-result.dto';
import { FilterStudentResultDto } from '../dto/student-result/filter-student-result.dto';


@Controller('student-results')
export class StudentResultController {
  constructor(private readonly studentResultService: StudentResultService) {}

  @Post()
  async create(@Body() createStudentResultDto: CreateStudentResultDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentResultService.create(createStudentResultDto);
    return {
      data: serviceResponse,
      message: 'StudentResult creado correctamente',
      title: 'StudentResult Creado',
    };
  }

  @Get()
  async findAll(@Query() filterStudentResultDto: FilterStudentResultDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentResultService.findAll(filterStudentResultDto);
    return {
      data: serviceResponse.data,
      pagination: { totalItems: serviceResponse.count, limit: filterStudentResultDto.limit },
      message: 'StudentResults encontrados correctamente',
      title: 'StudentResults Encontrados',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentResultService.findOne(id);
    return {
      data: serviceResponse,
      message: `StudentResult con ID ${id} encontrado correctamente`,
      title: 'StudentResult Encontrado',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudentResultDto: UpdateStudentResultDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentResultService.update(id, updateStudentResultDto);
    return {
      data: serviceResponse,
      message: `StudentResult con ID ${id} actualizado correctamente`,
      title: 'StudentResult Actualizado',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.studentResultService.remove(id);
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.OK)
  async removeAll(@Body() ids: string[]): Promise<ResponseHttpModel> {
    await this.studentResultService.removeAll(ids);
    return {
      data: null,
      message: 'StudentResults eliminados correctamente',
      title: 'StudentResults Eliminados',
    };
  }
}
