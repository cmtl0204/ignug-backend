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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '@auth/services';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from '@auth/dto';
import { Auth, PublicRoute } from '@auth/decorators';
import { ResponseHttpModel } from '@exceptions';
import { AppResource, AppRoles } from '../../../app.roles';
import { UserEntity } from '@auth/entities';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Auth({ possession: 'any', action: 'create', resource: AppResource.USER })
  @ApiOperation({ summary: 'Create User' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDto) {
    const data = await this.usersService.create({
      ...payload,
      roles: [AppRoles.ADMIN],
    });

    return {
      data,
      message: 'created',
    };
  }

  @ApiOperation({ summary: 'Catalogue of Users' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue() {
    const response = await this.usersService.catalogue();
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
  async findAll(@Query() params: FilterUserDto) {
    const response = await this.usersService.findAll(params);
    return {
      data: response.data,
      pagination: response.pagination,
      message: `index`,
    };
  }

  @ApiOperation({ summary: 'Find User' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.usersService.findOne(id);
    return {
      data,
      message: `show ${id}`,
      title: `Success`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'Update User' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    const data = await this.usersService.update(id, payload);

    return {
      data: data,
      message: `User updated ${id}`,
      title: `Updated`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'Remove User' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.usersService.remove(id);

    return {
      data,
      message: `User deleted ${id}`,
      title: `Deleted`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'Remove All Users' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: UserEntity[]) {
    const data = await this.usersService.removeAll(payload);

    return {
      data,
      message: `Users deleted`,
      title: `Deleted`,
    } as ResponseHttpModel;
  }
}
