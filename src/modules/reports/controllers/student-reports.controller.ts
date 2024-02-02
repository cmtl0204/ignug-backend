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
import {StudentReportsService} from "../services";

@ApiTags('Student Reports')
@Controller('student-reports')
export class StudentReportsController {
    constructor(private studentReportsService: StudentReportsService) {
    }

    @ApiOperation({summary: 'Socioeconomic Form Report'})
    @Get(':id/socioeconomic-form')
    @HttpCode(HttpStatus.OK)
    async generateSocioeconomicForm(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
        await this.studentReportsService.generateSocioeconomicForm(res, id);

        return {
            data: null,
            message: `Socioeconomic Form Report`,
            title: `Report`,
        };
    }
}
