import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import * as Joi from 'joi';
import { enviroments } from './enviroments';
import { DatabasesModule } from './databases/databases.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/modules';
import { CoreModule } from '@core/modules';
import config from './config';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
      }),
    }),
    HttpModule,
    DatabasesModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
