import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseHttpModel } from '@shared/models';
import { ExportsService } from '@core/services';

@ApiTags('Exports')
@Controller('exports')
export class ExportsController {
  constructor(private exportsService: ExportsService) {
  }

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

  @ApiOperation({ summary: 'Export Notas' })
  @Get('notas')
  @HttpCode(HttpStatus.CREATED)
  async exportStudents(@Res() res): Promise<ResponseHttpModel> {
    const path = await this.exportsService.exportNotes();
    return {
      data: res.sendFile(path),
      message: `Las notas fueron exportadas correctamente`,
      title: 'Exportado',
    };
  }
}
