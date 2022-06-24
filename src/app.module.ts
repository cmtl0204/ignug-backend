import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabasesModule } from './databases/databases.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import config from './config';
import { UsersModule } from './modules/users/users.module';
import * as Joi from 'joi';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthenticationsModule } from './modules/authentications/authentications.module';
import { CataloguesModule } from './modules/catalogues/catalogues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    DatabasesModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
    AuthenticationsModule,
    CataloguesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
