import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from '@database';
import { teacherEvaluationProviders } from './providers';

@Global()
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [

  ],
  providers: [
    ...teacherEvaluationProviders,
  ],
  exports: [
    ...teacherEvaluationProviders,
  ],
})
export class TeacherEvaluationModule {

}
