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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateInstitutionDto, FilterCareerDto, FilterInstitutionDto, UpdateInstitutionDto } from '@core/dto';
import { InstitutionEntity } from '@core/entities';
import { CareersService, GradesService, InstitutionsService, SchoolPeriodsService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';
import { Auth, User } from '@auth/decorators';
import { UserEntity } from '@auth/entities';

@ApiTags('Grades')
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {
  }

  @ApiOperation({ summary: 'Create' })
  @Post('enrollment-details/:enrollmentDetailId')
  @HttpCode(HttpStatus.CREATED)
  async createGradeByEnrollmentDetail(@Param('enrollmentDetailId') enrollmentDetailId: string, @Query('partialId') partialId: string, value: number): Promise<ResponseHttpModel> {
    const serviceResponse = await this.gradesService.createGradeByEnrollmentDetail(enrollmentDetailId, partialId, value);
    return {
      data: serviceResponse,
      message: `Calificación Registrada`,
      title: 'Registrada',
    };
  }
}
