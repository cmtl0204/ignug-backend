import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { ProductsController } from './controllers/products.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, ProductsController],
  providers: [AppService, UsersService],
})
export class AppModule {}
