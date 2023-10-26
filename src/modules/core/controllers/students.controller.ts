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
    Query
} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {ResponseHttpModel} from '@shared/models';
import {StudentsService} from '@core/services';
import {CreateStudentDto, FilterStudentDto, UpdateStudentDto} from '@core/dto';
import {StudentEntity} from '@core/entities';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
    constructor(private studentService: StudentsService) {
    }

    @ApiOperation({summary: 'Lista de todos los usuarios'})
    @Get('catalogue')
    @HttpCode(HttpStatus.OK)
    async catalogue(): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.catalogue();

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: `Catálogo`,
            title: `Catálogo`,
        };
    }

    @ApiOperation({summary: 'Lista de usuarios'})
    // @Roles(RoleEnum.ADMIN)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.findAll(params);
        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: `index`,
            title: `index`,
        };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.findOne(id);
        return {
            data: serviceResponse,
            message: `show ${id}`,
            title: `Éxito`,
        };
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.update(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado ${id}`,
            title: `Actualizado`,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.remove(id);

        return {
            data: serviceResponse,
            message: `Usuario eliminado ${id}`,
            title: `Eliminado`,
        };
    }

    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: StudentEntity[]) {
        const serviceResponse = await this.studentService.removeAll(payload);

        return {
            data: serviceResponse,
            message: `Usuarios eliminados`,
            title: `Eliminado`,
        };
    }

    @Patch(':id/personal-information')
    @HttpCode(HttpStatus.CREATED)
    async updatePersonalInformation(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updatePersonalInformation(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/academic-data')
    @HttpCode(HttpStatus.CREATED)
    async updateAcademicData(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updateAcademicData(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/other-academic-data')
    @HttpCode(HttpStatus.CREATED)
    async updateOtherAcademicData(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updateOtherAcademicData(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/origin-place')
    @HttpCode(HttpStatus.CREATED)
    async updateOriginPlace(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updateOriginPlace(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/residence-place')
    @HttpCode(HttpStatus.CREATED)
    async updateResidencePlace(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updateResidencePlace(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/family-group')
    @HttpCode(HttpStatus.CREATED)
    async updateFamilyGroup(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updateFamilyGroup(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/family-economic')
    @HttpCode(HttpStatus.CREATED)
    async updateFamilyEconomic(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updateFamilyEconomic(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/family-health')
    @HttpCode(HttpStatus.CREATED)
    async updateFamilyHealth(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updateFamilyHealth(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/housing-data')
    @HttpCode(HttpStatus.CREATED)
    async updateHousingData(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updateHousingData(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/migration-country')
    @HttpCode(HttpStatus.CREATED)
    async updateMigrationCountry(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updateMigrationCountry(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/psychosocial-section')
    @HttpCode(HttpStatus.CREATED)
    async updatePsychosocialSection(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updatePsychosocialSection(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }

    @Patch(':id/croquis')
    @HttpCode(HttpStatus.CREATED)
    async updateCroquis(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateStudentDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.studentService.updateCroquis(id, payload);

        return {
            data: serviceResponse,
            message: `Usuario actualizado`,
            title: `Actualizado`,
        };
    }
}
