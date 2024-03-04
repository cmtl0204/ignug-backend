import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from '@database';
import {
  CareerReportsController,
  EnrollmentReportsController,
  GradeReportsController,
  StudentReportsController,
} from './controllers';
import { CareerReportsService, EnrollmentReportsService, StudentReportsService } from './services';
import { GradeReportsService } from './services/grade-reports.service';

@Global()
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [CareerReportsController, EnrollmentReportsController, StudentReportsController, GradeReportsController],
  providers: [CareerReportsService, StudentReportsService, EnrollmentReportsService, GradeReportsService],
  exports: [CareerReportsService, StudentReportsService],
})
export class ReportsModule {

}
