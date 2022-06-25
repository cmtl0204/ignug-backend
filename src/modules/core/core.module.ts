import { Module } from '@nestjs/common';
import { CataloguesController, StudentsController } from '@core/controllers';
import { CataloguesService, StudentsService } from '@core/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueEntity, StudentEntity } from '@core/entities';
import { UsersModule } from '@users/modules';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogueEntity, StudentEntity]),
    UsersModule,
  ],
  controllers: [CataloguesController, StudentsController],
  providers: [CataloguesService, StudentsService],
  exports: [TypeOrmModule, CataloguesService, StudentsService],
})
export class CoreModule {}
