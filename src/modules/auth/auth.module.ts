import {Global, Module} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {config} from '@config';
import {AuthController, RolesController, UsersController} from '@auth/controllers';
import {AuditsService, AuthService, MenusService, RolesService} from '@auth/services';
import {JwtStrategy} from '@auth/strategies';
import {authProviders} from '@auth/providers';
import {DatabaseModule} from '@database';
import {MenusController} from './controllers/menus.controller';
import {CommonModule} from '@common/modules';
import {CoreModule} from "@core/modules";
import {UsersService} from './services/users.service';

@Global()
@Module({
    imports: [
        DatabaseModule,
        CommonModule,
        CoreModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                console.log('configService.jwtSecret1', configService.jwtSecret);
                console.log('*************************');
                return {
                    secret: configService.jwtSecret,
                    secretOrPrivateKey: configService.jwtSecret,
                    signOptions: {
                        expiresIn: '10s',
                    },
                };
            },
        }),
    ],
    controllers: [AuthController, MenusController, RolesController, UsersController],
    providers: [...authProviders, AuditsService, JwtService, JwtStrategy, AuthService, RolesService, UsersService, MenusService],
    exports: [...authProviders, UsersService, RolesService, MenusService, JwtService, AuditsService],
})
export class AuthModule {
}
