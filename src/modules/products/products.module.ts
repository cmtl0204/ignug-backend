import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { UsersModule } from '../users/users.module';
import { CataloguesModule } from '../catalogues/catalogues.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    UsersModule,
    CataloguesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
