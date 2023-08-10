import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { StudentsService } from '@core/services';
import { CreateStudentDto, FilterStudentDto, UpdateStudentDto } from '@core/dto';
import { StudentEntity } from '@core/entities';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @ApiOperation({ summary: 'Lista de todos los usuarios' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catálogo`,
      title: `Catálogo`,
    };
  }

  @ApiOperation({ summary: 'Lista de usuarios' })
  // @Roles(RoleEnum.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterStudentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentService.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: `index`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentService.findOne(id);
    return {
      data: serviceResponse,
      message: `show ${id}`,
      title: `Éxito`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentService.update(id, payload);

    return {
      data: serviceResponse,
      message: `Usuario actualizado ${id}`,
      title: `Actualizado`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentService.remove(id);

    return {
      data: serviceResponse,
      message: `Usuario eliminado ${id}`,
      title: `Eliminado`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: StudentEntity[]) {
    const serviceResponse = await this.studentService.removeAll(payload);

    return {
      data: serviceResponse,
      message: `Usuarios eliminados`,
      title: `Eliminado`,
    };
  }
}
