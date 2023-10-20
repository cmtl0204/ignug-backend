import {Global, Module} from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {DatabaseModule} from '@database';
import {CareerReportsController} from "./controllers";
import {CareerReportsService} from "./services";

@Global()
@Module({
    imports: [DatabaseModule, CacheModule.register()],
    controllers: [CareerReportsController],
    providers: [CareerReportsService],
    exports: [CareerReportsService],
})
export class ReportsModule {

}
