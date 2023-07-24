import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { catchError } from 'rxjs';
import { join } from 'path';
import { MailSubjectEnum, MailTemplateEnum } from '@shared/enums';
import { ConfigType } from '@nestjs/config';
import { config } from '@config';
import { environments } from '../../../environments';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async sendMail(
    to: string[] | string,
    subject: MailSubjectEnum,
    template: MailTemplateEnum,
    data: any = null,
  ) {
    return await this.mailerService
      .sendMail({
        to,
        from: `${this.configService.mail.fromName} - ${this.configService.mail.from}`,
        subject,
        template,
        context: {
          data,
          system: environments.appName,
        },
        // attachments: [
        //   {
        //     path: join('resources', 'temps', 'test.hbs'),
        //     filename: 'test2.hbs',
        //     contentDisposition: 'attachment',
        //   },
        // ],
      })
      .then(
        (response) => {
          return { accepted: response.accepted, rejected: response.rejected };
        },
        catchError((error) => {
          return error;
        }),
      );
  }
}
