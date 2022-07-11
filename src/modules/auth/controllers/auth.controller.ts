import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PublicRoute, User } from '@auth/decorators';
import { JwtGuard, LoginGuard } from '@auth/guards';
import { AuthService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import { LoginDto } from '@auth/dto';

@ApiTags('auth')
@UseGuards(JwtGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('login')
  @UseGuards(LoginGuard)
  @HttpCode(HttpStatus.CREATED)
  login(@Body() payload: LoginDto, @User() user: UserEntity) {
    return this.authService.generateJwt(user);
  }

  @Get('logout')
  @HttpCode(HttpStatus.CREATED)
  logout(@Req() req: Request) {
    return 'finish';
  }
}
