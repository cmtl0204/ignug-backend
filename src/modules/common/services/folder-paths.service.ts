import {Injectable} from '@nestjs/common';
import {join} from 'path';

@Injectable()
export class FolderPathsService {
    constructor() {
    }

    get mailTempFiles(): string {
        return join(process.cwd(), 'resources/mail/temp');
    }
}
