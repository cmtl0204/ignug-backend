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
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from '@core/services';
import { CreateUserDto } from '@core/dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'List of users' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() params: any) {
    const sortFields = params.sort
      ? params.sort.split(',').filter((sort) => sort != '')
      : null;
    const selectedFields = params.fields
      ? params.fields.split(',').filter((field) => field != '')
      : null;
    const data = this.usersService.findAll();
    return data;

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
    const search = params.search
      ? params.search.split(',').filter((search) => search != '')
      : null;
    return {
      data: 'data',
      message: `filter`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const data = this.usersService.findOne(id);
    return data;
    return {
      data,
      message: `show ${id}`,
    };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateUserDto) {
    const data = this.usersService.create(payload);

    return {
      data,
      message: 'created',
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return {
      data: payload,
      message: `updated ${id}`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  remove(@Param('id', ParseIntPipe) id: number) {
    return {
      data: true,
      message: `deleted ${id}`,
    };
  }
}
