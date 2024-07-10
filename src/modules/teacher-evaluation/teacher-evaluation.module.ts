import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from '@database';
import { teacherEvaluationProviders } from './providers';
import { EvaluationController } from './controllers/evaluation.controller';
import { EvaluationService } from './services/evaluation.service';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';

@Global()
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [
    EvaluationController,
    QuestionController
  ],
  providers: [
    ...teacherEvaluationProviders,
    EvaluationService,
    QuestionService

  ],

})
export class TeacherEvaluationModule {}
