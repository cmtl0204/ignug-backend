import {Global, Module} from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {DatabaseModule} from '@database';
import {CareerReportsController, StudentReportsController} from "./controllers";
import {CareerReportsService, StudentReportsService} from "./services";

@Global()
@Module({
    imports: [DatabaseModule, CacheModule.register()],
    controllers: [CareerReportsController, StudentReportsController],
    providers: [CareerReportsService, StudentReportsService],
    exports: [CareerReportsService, StudentReportsService],
})
export class ReportsModule {

}
