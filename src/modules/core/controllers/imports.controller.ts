import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

import {ImportsService} from '@core/services';
import {ResponseHttpModel} from '@shared/models';

@ApiTags('Imports')
@Controller('imports')
export class ImportsController {
    constructor(private importsService: ImportsService) {
    }

    @ApiOperation({summary: 'Import Students'})
    @Get('students')
    @HttpCode(HttpStatus.CREATED)
    async importStudents(): Promise<ResponseHttpModel> {
        const serviceResponse = await this.importsService.importStudents();

        return {
            data: serviceResponse,
            message: `Los estudiantes fueron importados correctamente`,
            title: 'Importado',
        };
    }

    @ApiOperation({summary: 'Import Teachers'})
    @Get('teachers')
    @HttpCode(HttpStatus.CREATED)
    async importTeachers(): Promise<ResponseHttpModel> {
        const serviceResponse = await this.importsService.importTeachers();
        return {
            data: serviceResponse,
            message: `Los docentes fueron importados correctamente`,
            title: 'Importado',
        };
    }

    @ApiOperation({summary: 'Import DPA'})
    @Get('dpa')
    @HttpCode(HttpStatus.CREATED)
    async importDPA(): Promise<ResponseHttpModel> {
        await this.importsService.importCountries();
        await this.importsService.importDPA();
        return {
            data: null,
            message: `DPA importada correctamente`,
            title: 'Importado',
        };
    }
}
