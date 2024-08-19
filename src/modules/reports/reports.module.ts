import {Global, Module} from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {DatabaseModule} from '@database';
import {
    CareerReportsController,
    EnrollmentReportsController,
    GradeReportsController,
    StudentReportsController,
} from './controllers';
import {CareerReportsService, EnrollmentReportsService, StudentReportsService} from './services';
import {GradeReportsService} from './services/grade-reports.service';
import {StudentSqlService} from './services/student-sql.service';
import {EnrollmentSqlService} from './services/enrollment-sql.service';
import {PdfmakeController} from './controllers/pdfmake.controller';
import {PrinterService} from './services/printer.service';
import {TeacherEvaluationReportsController} from "./controllers/teacher-evaluation-reports.controller";
import {TeacherEvaluationReportsService} from "./services/teacher-evaluation-reports.service";
import {TeacherEvaluationSqlService} from "./services/teacher-evaluation-sql.service";

@Global()
@Module({
    imports: [DatabaseModule, CacheModule.register()],
    controllers: [
        CareerReportsController,
        EnrollmentReportsController,
        StudentReportsController,
        GradeReportsController,
        PdfmakeController,
        TeacherEvaluationReportsController
    ],
    providers: [
        PrinterService,
        CareerReportsService,
        StudentReportsService,
        EnrollmentReportsService,
        GradeReportsService,
        StudentSqlService,
        EnrollmentSqlService,
        TeacherEvaluationReportsService,
        TeacherEvaluationSqlService
    ],
    exports: [
        CareerReportsService,
        StudentReportsService,
    ],
})
export class ReportsModule {

}
