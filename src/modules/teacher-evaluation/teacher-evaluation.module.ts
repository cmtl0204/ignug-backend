import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from '@database';
import { teacherEvaluationProviders } from './providers';
import { EvaluationController } from './controllers/evaluation.controller';
import { EvaluationService } from './services/evaluation.service';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';
import { ResponseService } from './services/response.service';
import { ResponseController } from './controllers/response.controller';
import { ResultController } from './controllers/result.controller';
import { ResultService } from './services/result.service';
import { StudentResultController } from './controllers/student-result.controller';
import { StudentResultService } from './services/student-result.service';

@Global()
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [
    EvaluationController,
    QuestionController,
    ResponseController,
    ResultController,
    StudentResultController
  ],
  providers: [
    ...teacherEvaluationProviders,
    EvaluationService,
    QuestionService,
    ResponseService,
    ResultService,
    StudentResultService
  ],

})
export class TeacherEvaluationModule {}
