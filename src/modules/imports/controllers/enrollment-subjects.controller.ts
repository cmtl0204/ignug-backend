import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { GradesService } from '../services/grades.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { excelFileFilter, getFileName } from '@shared/helpers';
import { EnrollmentsService } from '../services/enrollments.service';
import {EnrollmentSubjectsService} from "../services/enrollment-subjects.service";

@ApiTags('Imports Enrollments')
@Controller('imports/enrollment-subjects')
export class EnrollmentSubjectsController {
  constructor(private readonly enrollmentSubjectsService: EnrollmentSubjectsService) {
  }

  @ApiOperation({ summary: 'Import Enrollments' })
  // @Roles(RoleEnum.ADMIN)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'storage/imports'),
        filename: getFileName,
      }),
      fileFilter: excelFileFilter,
    }),
  )
  async import(@UploadedFile() file: Express.Multer.File,
                     @Body() payload: any): Promise<ResponseHttpModel> {
    await this.enrollmentSubjectsService.import(file);

    return {
      data: null,
      message: `Asignaturas Matriculadas Importadas Correctamente`,
      title: `Importado`,
    };
  }
}
