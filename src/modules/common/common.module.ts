import { Global, Module } from '@nestjs/common';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';
import { MailModule } from './mail/mail.module';

@Global()
@Module({
  imports: [MailModule],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [MailModule],
})
export class CommonModule {}
