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
import { UsersService } from '@auth/services';
import { CreateUserDto } from '@auth/dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'List of users' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() params: any) {
    const response = this.usersService.findAll();
    return response;
    // const sortFields = params.sort
    //   ? params.sort.split(',').filter((sort) => sort != '')
    //   : null;
    // const selectedFields = params.fields
    //   ? params.fields.split(',').filter((field) => field != '')
    //   : null;
    // const data = this.usersService.findAll();
    // return data;
    //
    // return {
    //   data,
    //   message: `index`,
    // };
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    const response = this.usersService.findOne(id);
    return response;
    // return {
    //   data,
    //   message: `show ${id}`,
    // };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateUserDto) {
    const response = this.usersService.create(payload);
    return response;

    // return {
    //   data,
    //   message: 'created',
    // };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    const response = this.usersService.update(id, payload);
    return response;
    // return {
    //   data: payload,
    //   message: `updated ${id}`,
    // };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  remove(@Param('id', ParseIntPipe) id: number) {
    const response = this.usersService.remove(id);
    return response;
    // return {
    //   data: true,
    //   message: `deleted ${id}`,
    // };
  }
}
