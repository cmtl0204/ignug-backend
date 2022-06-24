import { Module } from '@nestjs/common';
import { CataloguesService } from './catalogues.service';
import { CataloguesController } from './catalogues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueEntity } from './entities/catalogue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogueEntity])],
  controllers: [CataloguesController],
  providers: [CataloguesService],
  exports: [TypeOrmModule, CataloguesService],
})
export class CataloguesModule {}
