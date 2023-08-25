import { PDFService, PDFNotas } from '@core/services';
import { Controller, Get, Res } from '@nestjs/common';
import path = require('path');

@Controller('pdf')
export class PDFController {
  constructor(private readonly pdfService: PDFService, private pdfnotasservice: PDFNotas) {

  }
 
  @Get('download')
  async downloadPDF(@Res() res): Promise<void> {
    const buffer = await this.pdfService.generatePDF();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })
    res.end(buffer);
  }

  @Get('downloadNotas')
  async downloadnOTAS(@Res() res): Promise<void> {
    const buffer = await this.pdfnotasservice.generarPDF();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })
    res.end(buffer);
  }
}
