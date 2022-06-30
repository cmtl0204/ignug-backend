import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import config from '../../config';
import { AuthController, UsersController } from '@auth/controllers';
import { UserEntity } from '@auth/entities';
import { AuthService, UsersService } from '@auth/services';
import { LocalStrategy, JwtStrategy } from '@auth/strategies';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, JwtStrategy, LocalStrategy, UsersService],
  exports: [AuthService, UsersService],
})
export class AuthModule {}
