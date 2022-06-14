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
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  index(@Query() params: any) {
    const sortFields = params.sort
      ? params.sort.split(',').filter((sort) => sort != '')
      : null;
    const selectedFields = params.fields
      ? params.fields.split(',').filter((field) => field != '')
      : null;
    const data = this.usersService.getAll();
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
  show(@Param('id', ParseIntPipe) id: number) {
    return {
      data: 'data',
      message: `show ${id}`,
    };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  store(@Body() payload: any) {
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
  destroy(@Param('id', ParseIntPipe) id: number) {
    return {
      data: true,
      message: `deleted ${id}`,
    };
  }
}
