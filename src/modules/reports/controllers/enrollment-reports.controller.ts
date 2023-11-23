import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param, ParseUUIDPipe,
    Res
} from '@nestjs/common';
import {ApiTags, ApiOperation} from '@nestjs/swagger';
import {ResponseHttpModel} from '@shared/models';
import {EnrollmentReportsService} from "../services";

@ApiTags('Enrollment Reports')
@Controller('enrollment-reports')
export class EnrollmentReportsController {
    constructor(private enrollmentReportsService: EnrollmentReportsService) {
    }

    @ApiOperation({summary: 'Enrollment Certificate Report'})
    @Get(':id/certificate')
    @HttpCode(HttpStatus.OK)
    async generateEnrollmentCertificate(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
        await this.enrollmentReportsService.generateEnrollmentCertificate(res, id);

        return {
            data: null,
            message: `Enrollment Certificate`,
            title: `Report`,
        };
    }

    @ApiOperation({summary: 'Enrollment Application Report'})
    @Get(':id/application')
    @HttpCode(HttpStatus.OK)
    async generateEnrollmentApplication(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
        await this.enrollmentReportsService.generateEnrollmentApplication(res, id);

        return {
            data: null,
            message: `Enrollment Certificate`,
            title: `Report`,
        };
    }
}
