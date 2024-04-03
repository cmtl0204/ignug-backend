import {Global, Module} from '@nestjs/common';
import {DatabaseModule} from '@database';
import { GradesController } from './controllers';
import { GradesService } from './services/grades.service';
import { TeachersController } from './controllers';
import { TeachersService } from './services/teachers.service';
import {EnrollmentsController} from "./controllers/enrollments.controller";
import {EnrollmentsService} from "./services/enrollments.service";


@Global()
@Module({
    imports: [DatabaseModule],
    controllers: [GradesController,TeachersController,EnrollmentsController],
    providers: [GradesService,TeachersService,EnrollmentsService],
    exports: [],
})
export class ImportsModule {

}
