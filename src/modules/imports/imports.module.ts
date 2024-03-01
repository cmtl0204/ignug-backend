import {Global, Module} from '@nestjs/common';
import {DatabaseModule} from '@database';
import { GradesController } from './controllers';
import { GradesService } from './services/grades.service';

@Global()
@Module({
    imports: [DatabaseModule],
    controllers: [GradesController],
    providers: [GradesService],
    exports: [],
})
export class ImportsModule {

}
