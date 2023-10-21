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
    Res,
} from '@nestjs/common';
import {ApiTags, ApiOperation} from '@nestjs/swagger';
import {CreateCareerDto, UpdateCareerDto, FilterCareerDto, CreateEnrollmentDto, FilterEnrollmentDto} from '@core/dto';
import {EnrollmentsService, PDFService, PDFNotas, EnrollmentsDetailService} from '@core/services';
import {CareerEntity, EnrollmentEntity} from '@core/entities';
import {ResponseHttpModel} from '@shared/models';

@ApiTags('enrollments')
@Controller('enrollments')
export class EnrollmentsController {
    constructor(
        private readonly enrollmentsService: EnrollmentsService,
        private readonly enrollmentsDetailService: EnrollmentsDetailService,
        private pdfservice: PDFService, private pdfnotasservice: PDFNotas) {
    }

    @ApiOperation({summary: 'Create Enrollment'})
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateEnrollmentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.enrollmentsService.create(payload);

        return {
            data: serviceResponse,
            message: 'Reporte de notas fue creada',
            title: 'Reporte de notas creada',
        };
    }

    @ApiOperation({summary: 'Find All enrollments'})
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterEnrollmentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.enrollmentsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Buscar reporte de notas',
            title: 'Success',
        };
    }

    @ApiOperation({summary: 'Find Enrollment'})
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
        const serviceResponse = await this.enrollmentsService.findOne(id);

        return {
            data: serviceResponse,
            message: `Buscar reporte de notas`,
            title: `Success`,
        };
    }

    @ApiOperation({summary: 'Update Career'})
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateCareerDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.enrollmentsService.update(id, payload);
        return {
            data: serviceResponse,
            message: `Reporte de notas fue actualizada`,
            title: `Reporte de notas actualizada`,
        };
    }

    @ApiOperation({summary: 'Delete Career'})
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
        const serviceResponse = await this.enrollmentsService.remove(id);
        return {
            data: serviceResponse,
            message: `Reporte de notas fue eliminada`,
            title: `Reporte de notas eliminada`,
        };
    }

    @ApiOperation({summary: 'Delete All enrollments'})
    @Patch('remove-all')
    @HttpCode(HttpStatus.OK)
    async removeAll(@Body() payload: EnrollmentEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.enrollmentsService.removeAll(payload);

        return {
            data: serviceResponse,
            message: `Reporte de notas fueron eliminadas`,
            title: `Reporte de notas eliminadas`,
        };
    }

    @ApiOperation({summary: 'Find Enrollment Details By Enrollment'})
    @Get(':id/enrollment-details')
    @HttpCode(HttpStatus.OK)
    async findEnrollmentDetailsByEnrollment(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
        const serviceResponse = await this.enrollmentsDetailService.findEnrollmentDetailsByEnrollment(id);

        return {
            data: serviceResponse,
            message: `Success`,
            title: `Success`,
        };
    }
}


