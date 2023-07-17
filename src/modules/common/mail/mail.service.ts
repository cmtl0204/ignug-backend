import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { catchError } from 'rxjs';
import { join } from 'path';
import { TemplateEnum } from '@shared/enums';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string[], subject: string, template: TemplateEnum) {
    return await this.mailerService
      .sendMail({
        to,
        from: 'noreply@gmail.com',
        subject,
        template,
        attachments: [
          {
            path: join(__dirname, 'templates', 'test.hbs'),
            filename: 'test2.hbs',
            contentDisposition: 'attachment',
          },
        ],
      })
      .then(
        (response) => {
          console.log(response);
          return { accepted: response.accepted, rejected: response.rejected };
        },
        catchError((error) => {
          console.log(error);
          return error;
        }),
      );
  }
}
