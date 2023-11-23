import {Global, Module} from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {DatabaseModule} from '@database';
import {CareerReportsController, EnrollmentReportsController, StudentReportsController} from "./controllers";
import {CareerReportsService, EnrollmentReportsService, StudentReportsService} from "./services";

@Global()
@Module({
    imports: [DatabaseModule, CacheModule.register()],
    controllers: [CareerReportsController,EnrollmentReportsController, StudentReportsController],
    providers: [CareerReportsService, StudentReportsService, EnrollmentReportsService],
    exports: [CareerReportsService, StudentReportsService],
})
export class ReportsModule {

}
