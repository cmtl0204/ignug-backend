import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PublicRoute } from '@auth/decorators';
import { JwtGuard, LoginGuard } from '@auth/guards';
import { AuthService } from '@auth/services';
import { UserEntity } from '@core/entities';

@ApiTags('auth')
@UseGuards(JwtGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('login')
  @UseGuards(LoginGuard)
  @HttpCode(HttpStatus.CREATED)
  login(@Req() req: Request) {
    return this.authService.generateJwt(req.user as UserEntity);
  }

  @Post('logout')
  @HttpCode(HttpStatus.CREATED)
  logout(@Req() req: Request) {
    return 'finish';
  }
}
