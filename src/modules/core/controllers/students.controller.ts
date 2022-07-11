import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from '@auth/dto';
import { Roles } from '@auth/decorators';
import { RoleEnum } from '@auth/enums';
import { JwtGuard, RolesGuard } from '@auth/guards';
import { ResponseHttpModel } from '../../../exceptions/response-http.model';
import { StudentsService } from '@core/services';
import { FilterStudentDto } from '@core/dto';

@ApiTags('students')
// @UseGuards(JwtGuard, RolesGuard)
@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDto) {
    const data = await this.studentService.create(payload);

    return {
      data,
      message: 'created',
    };
  }

  @ApiOperation({ summary: 'List all users' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue() {
    const response = await this.studentService.catalogue();
    return {
      data: response.data,
      message: `catalogue`,
      title: `Catalogue`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'List of users' })
  // @Roles(RoleEnum.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterStudentDto) {
    const response = await this.studentService.findAll(params);
    return {
      data: response.data,
      pagination: response.pagination,
      message: `index`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.studentService.findOne(id);
    return {
      data,
      message: `show ${id}`,
      title: `Success`,
    } as ResponseHttpModel;
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    const data = await this.studentService.update(id, payload);

    return {
      data: data,
      message: `User updated ${id}`,
      title: `Updated`,
    } as ResponseHttpModel;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.studentService.remove(id);

    return {
      data,
      message: `User deleted ${id}`,
      title: `Deleted`,
    } as ResponseHttpModel;
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: number[]) {
    const data = await this.studentService.removeAll(payload);

    return {
      data,
      message: `Users deleted`,
      title: `Deleted`,
    } as ResponseHttpModel;
  }
}
