import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseHttpModel } from '@shared/models';
import { ExportsService } from '@core/services';

@ApiTags('Exports')
@Controller('exports')
export class ExportsController {
  constructor(private exportsService: ExportsService) {}

  @ApiOperation({ summary: 'Export Students' })
  @Get('students')
  @HttpCode(HttpStatus.CREATED)
  async importStudents(@Res() res): Promise<ResponseHttpModel> {
    const path = await this.exportsService.exportStudents();
    return {
      data: res.sendFile(path),
      message: `Los estudiantes fueron exportados correctamente`,
      title: 'Exportado',
    };
  }
}
