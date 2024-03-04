import {Global, Module} from '@nestjs/common';
import {DatabaseModule} from '@database';
import { GradesController } from './controllers';
import { GradesService } from './services/grades.service';
import { TeachersController } from './controllers';
import { TeachersService } from './services/teachers.service';


@Global()
@Module({
    imports: [DatabaseModule],
    controllers: [GradesController,TeachersController],
    providers: [GradesService,TeachersService],
    exports: [],
})
export class ImportsModule {

}
