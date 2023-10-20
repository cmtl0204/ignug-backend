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
    Query, Res
} from '@nestjs/common';
import {ApiTags, ApiOperation} from '@nestjs/swagger';
import {CreateCareerDto, UpdateCareerDto} from '@core/dto';
import {CareersService} from '@core/services';
import {CareerEntity} from '@core/entities';
import {ResponseHttpModel} from '@shared/models';
import {Auth, User} from '@auth/decorators';
import {UserEntity} from '@auth/entities';
import {CareerReportsService} from "../services";

@ApiTags('Career Reports')
@Controller('career-reports')
export class CareerReportsController {
    constructor(private careerReportsService: CareerReportsService) {
    }

    @ApiOperation({summary: 'Career Report'})
    @Get('careers')
    @HttpCode(HttpStatus.OK)
    async catalogue(@Res() res: Response): Promise<ResponseHttpModel> {
        await this.careerReportsService.generateCareers(res);

        return {
            data: null,
            message: `Career Report`,
            title: `Report`,
        };
    }
}
