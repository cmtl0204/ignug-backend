import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from '@database';
import { teacherEvaluationProviders } from './providers';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';
import { ResponseService } from './services/response.service';
import { ResponseController } from './controllers/response.controller';
import { ResultController } from './controllers/result.controller';
import { ResultService } from './services/result.service';
import { StudentResultController } from './controllers/student-result.controller';
import { StudentEvaluationService } from './services/student-evaluation.service';

@Global()
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [

    QuestionController,
    ResponseController,
    ResultController,
    StudentResultController
  ],
  providers: [
    ...teacherEvaluationProviders,
    QuestionService,
    ResponseService,
    ResultService,
    StudentEvaluationService
  ],

})
export class TeacherEvaluationModule {}
