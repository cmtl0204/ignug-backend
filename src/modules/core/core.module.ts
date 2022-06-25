import { Global, Module } from '@nestjs/common';
import {
  CataloguesController,
  StudentsController,
  UsersController,
} from '@core/controllers';
import {
  CataloguesService,
  StudentsService,
  UsersService,
} from '@core/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueEntity, StudentEntity, UserEntity } from '@core/entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogueEntity, StudentEntity, UserEntity]),
  ],
  controllers: [CataloguesController, StudentsController, UsersController],
  providers: [CataloguesService, StudentsService, UsersService],
  exports: [TypeOrmModule, CataloguesService, StudentsService, UsersService],
})
export class CoreModule {}
