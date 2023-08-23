import {
    Controller,
    Get,
    Res,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SecretaryService } from '@core/services';

@ApiTags('Secretary')
@Controller('secretary')

export class SecretaryController {
    constructor(private secretaryService: SecretaryService) { }

    @ApiOperation({ summary: 'Generate report' })
    @Get("pdf/download")
    @HttpCode(HttpStatus.OK)
    async downloadPDF(): Promise<any> {
        const buffer = await this.secretaryService.downloadReport();
        const pdfBase64 = buffer.toString('base64');

        return {
            data: pdfBase64,
            message: `response`,
            title: `response`,
        };
    }
}