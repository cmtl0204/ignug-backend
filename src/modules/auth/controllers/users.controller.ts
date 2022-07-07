import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '@auth/services';
import { CreateUserDto, UpdateUserDto } from '@auth/dto';
import { Roles } from '@auth/decorators';
import { RoleEnum } from '@auth/enums';
import { JwtGuard, RolesGuard } from '@auth/guards';

@ApiTags('users')
// @UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDto) {
    const data = await this.usersService.create(payload);

    return {
      data,
      message: 'created',
    };
  }

  @ApiOperation({ summary: 'List of users' })
  // @Roles(RoleEnum.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any) {
    const data = await this.usersService.findAll();
    // const sortFields = params.sort
    //   ? params.sort.split(',').filter((sort) => sort != '')
    //   : null;
    // const selectedFields = params.fields
    //   ? params.fields.split(',').filter((field) => field != '')
    //   : null;
    // const data = this.usersService.findAll();
    // return data;
    //
    return {
      data,
      message: `index`,
    };
  }

  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  catalogue(@Query() params: any) {
    const selectedFields = params.fields
      ? params.fields.split(',').filter((field) => field != '')
      : null;
    return {
      data: 'data',
      message: `catalogue`,
    };
  }

  @ApiOperation({ summary: 'Filtrar usuarios' })
  @Get('filter')
  @HttpCode(HttpStatus.OK)
  filter(@Query() params: any) {
    // const search = params.search
    //   ? params.search.split(',').filter((search) => search != '')
    //   : null;
    // return {
    //   data: 'data',
    //   message: `filter`,
    // };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.usersService.findOne(id);
    return {
      data,
      message: `show ${id}`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    const data = await this.usersService.update(id, payload);

    return {
      data: data,
      message: `user updated ${id}`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.usersService.remove(id);

    return {
      data,
      message: `user deleted ${id}`,
    };
  }
}
