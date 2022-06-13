import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('')
  @HttpCode(HttpStatus.OK)
  getAll() {
    return 'getAll';
  }

  @Get('filter')
  filter(@Query() params: any) {
    const sortFields = params.sort
      ? params.sort.split(',').filter((sort) => sort != '')
      : null;
    const selectedFields = params.sort
      ? params.fields.split(',').filter((field) => field != '')
      : null;

    return selectedFields;
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return `getOne ${id}`;
  }
}
