import {Global, Module} from '@nestjs/common';
import {DatabaseModule} from '@database';
import { GradesController } from './controllers';
import { GradesService } from './services/grades.service';
import { TeachersController } from './controllers';
import { TeachersService } from './services/teachers.service';
import {EnrollmentsController} from "./controllers/enrollments.controller";
import {EnrollmentsService} from "./services/enrollments.service";
import {SubjectsController} from "./controllers/subjects.controller";
import {SubjectsService} from "./services/subjects.service";


@Global()
@Module({
    imports: [DatabaseModule],
    controllers: [GradesController,TeachersController,EnrollmentsController,SubjectsController],
    providers: [GradesService,TeachersService,EnrollmentsService,SubjectsService],
    exports: [],
})
export class ImportsModule {

}
