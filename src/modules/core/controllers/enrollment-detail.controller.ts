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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateEnrollmentsDetailDto,
  UpdateEnrollmentsDetailDto,
  FilterEnrollmentsDetailDto,
  UpdateEnrollmentDto
} from '@core/dto';
import { EnrollmentDetailsService } from '@core/services';
import { EnrollmentDetailEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';
import {User} from "@auth/decorators";
import {UserEntity} from "@auth/entities";

@ApiTags('Enrillment-details')
@Controller('enrollments-details')
export class  EnrollmentDetailsController {
  constructor(private enrollmentDetailsService: EnrollmentDetailsService) { }

  @ApiOperation({ summary: 'Create Career' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateEnrollmentsDetailDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentDetailsService.create(payload);

    return {
      data: serviceResponse,
      message: 'Reporte de notas fue creada',
      title: 'Reporte de notas  creada',
    };
  }

  @ApiOperation({ summary: 'Find All enrollmentDetails' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterEnrollmentsDetailDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentDetailsService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Buscar reporte de notas ',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find Career' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentDetailsService.findOne(id);

    return {
      data: serviceResponse,
      message: `Buscar reporte de rotas `,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update Career' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateEnrollmentsDetailDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentDetailsService.update(id, payload);
    return {
      data: serviceResponse,
      message: `Reporte de notas fue actualizada`,
      title: `Reporte de notas actualizada`,
    };
  }

  @ApiOperation({ summary: 'Delete Career' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentDetailsService.remove(id);
    return {
      data: serviceResponse,
      message: `Reporte de notas fue eliminada`,
      title: `Reporte de notas eliminada`,
    };
  }

  @ApiOperation({ summary: 'Delete All enrollmentDetails' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: EnrollmentDetailEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentDetailsService.removeAll(payload);

    return {
      data: serviceResponse,
      message: `Reporte de notas fueron eliminadas`,
      title: `Reporte de notas eliminadas`,
    };
  }

  @ApiOperation({summary: 'Approve Enrollment'})
  @Patch(':id/approve')
  @HttpCode(HttpStatus.CREATED)
  async approve(@Param('id', ParseUUIDPipe) id: string, @User() user: UserEntity, @Body() payload: UpdateEnrollmentsDetailDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentDetailsService.approve(id, user.id, payload);
    return {
      data: serviceResponse,
      message: `La solicitud fue aprobada`,
      title: `Aprobada`,
    };
  }

  @ApiOperation({summary: 'Approve Enrollment'})
  @Patch(':id/reject')
  @HttpCode(HttpStatus.CREATED)
  async reject(@Param('id', ParseUUIDPipe) id: string, @User() user: UserEntity, @Body() payload: UpdateEnrollmentsDetailDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentDetailsService.reject(id, user.id, payload);
    return {
      data: serviceResponse,
      message: `La solicitud fue rechazada`,
      title: `Rechazada`,
    };
  }

  @ApiOperation({summary: 'Enroll Enrollment'})
  @Patch(':id/enroll')
  @HttpCode(HttpStatus.CREATED)
  async enroll(@Param('id', ParseUUIDPipe) id: string, @User() user: UserEntity, @Body() payload: UpdateEnrollmentsDetailDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentDetailsService.enroll(id, user.id, payload);
    return {
      data: serviceResponse,
      message: `La matrícula fue creada`,
      title: `Matriculado`,
    };
  }

  @ApiOperation({summary: 'Enroll Enrollment'})
  @Patch(':id/revoke')
  @HttpCode(HttpStatus.CREATED)
  async revoke(@Param('id', ParseUUIDPipe) id: string, @User() user: UserEntity, @Body() payload: UpdateEnrollmentsDetailDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentDetailsService.revoke(id, user.id, payload);
    return {
      data: serviceResponse,
      message: `La matrícula fue anulada`,
      title: `Anulada`,
    };
  }
}