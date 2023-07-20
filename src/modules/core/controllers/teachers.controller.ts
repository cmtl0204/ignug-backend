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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { StudentsService, TeachersService } from '@core/services';
import {
  CreateStudentDto,
  FilterStudentDto,
  UpdateStudentDto,
} from '@core/dto';
import { StudentEntity } from '@core/entities';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateStudentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teachersService.create(payload);

    return {
      data: serviceResponse,
      message: 'student created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teachersService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  @ApiOperation({ summary: 'List of users' })
  // @Roles(RoleEnum.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterStudentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teachersService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: `index`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teachersService.findOne(id);
    return {
      data: serviceResponse,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teachersService.update(id, payload);

    return {
      data: serviceResponse,
      message: `User updated ${id}`,
      title: `Updated`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teachersService.remove(id);

    return {
      data: serviceResponse,
      message: `User deleted ${id}`,
      title: `Deleted`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: StudentEntity[]) {
    const serviceResponse = await this.teachersService.removeAll(payload);

    return {
      data: serviceResponse,
      message: `Users deleted`,
      title: `Deleted`,
    };
  }
}
