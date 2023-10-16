import {Injectable} from '@nestjs/common';
import {join} from 'path';

@Injectable()
export class FolderPathsService {
    constructor() {
    }

    get mailTemporaryFiles(): string {
        return join(process.cwd(), 'resources/mail/temporary');
    }

    get mailTemplates(): string {
        return join(process.cwd(), 'resources/mail/templates');
    }
}
