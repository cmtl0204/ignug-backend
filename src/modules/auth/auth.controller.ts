import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '@auth/dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/services';
import { PublicRoute } from '@auth/decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @PublicRoute()
  @HttpCode(HttpStatus.CREATED)
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }
}
