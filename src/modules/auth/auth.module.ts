import {Global, Module} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {config} from '@config';
import {AuthController, RolesController, UsersController} from '@auth/controllers';
import {AuditsService, AuthService, MenusService, RolesService, UsersService} from '@auth/services';
import {JwtStrategy} from '@auth/strategies';
import {authProviders} from '@auth/providers';
import {DatabaseModule} from '@database';
import {MenusController} from './controllers/menus.controller';
import {CommonModule} from '@common/modules';

@Global()
@Module({
    imports: [
        DatabaseModule,
        CommonModule,
        // PassportModule.register({ defaultStrategy: 'jwt' }),
        // JwtModule.registerAsync({
        //   inject: [config.KEY],
        //   useFactory: (configService: ConfigType<typeof config>) => {
        //     return {
        //       secret: configService.jwtSecret,
        //       signOptions: {
        //         expiresIn: '1d',
        //       },
        //     };
        //   },
        // }),
    ],
    controllers: [AuthController, MenusController, RolesController, UsersController],
    providers: [...authProviders, AuditsService, JwtStrategy, AuthService, RolesService, UsersService, MenusService, JwtService],
    exports: [UsersService, RolesService, MenusService, JwtService, AuditsService],
})
export class AuthModule {
}
