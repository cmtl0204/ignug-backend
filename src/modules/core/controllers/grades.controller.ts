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
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {GradesService} from '@core/services';
import {ResponseHttpModel} from '@shared/models';

@ApiTags('Grades')
@Controller('grades')
export class GradesController {
    constructor(private readonly gradesService: GradesService) {
    }

    @ApiOperation({summary: 'Create'})
    @Post('enrollment-details/:enrollmentDetailId')
    @HttpCode(HttpStatus.CREATED)
    async saveGradesByTeacher(@Param('enrollmentDetailId') enrollmentDetailId: string, @Body() payload: any): Promise<ResponseHttpModel> {
        const serviceResponse = await this.gradesService.saveGradesByTeacher(enrollmentDetailId, payload);
        return {
            data: serviceResponse,
            message: `Calificación Registrada`,
            title: 'Registrada',
        };
    }
}
