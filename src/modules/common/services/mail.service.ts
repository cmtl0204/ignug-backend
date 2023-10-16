import {Inject, Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {catchError} from 'rxjs';
import {MailSubjectEnum, MailTemplateEnum} from '@shared/enums';
import {ConfigType} from '@nestjs/config';
import {config} from '@config';
import {environments} from '../../../environments';
import {AttachmentInterface} from "../interfaces/attachment.interface";
import {MailDataInterface} from "../interfaces/mail-data.interface";
import {join} from "path";
import {FolderPathsService} from "./folder-paths.service";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService,
                @Inject(config.KEY) private configService: ConfigType<typeof config>,
                private readonly folderPathsService: FolderPathsService) {
    }

    async sendMail(mailData: MailDataInterface) {
        const mailAttachments = [];

        if (mailData.attachments) {
            mailData.attachments.forEach(attachment => {
                const data = {
                    path: join(this.folderPathsService.mailTemporaryFiles, attachment.path),
                    filename: attachment.filename,
                    contentDisposition: 'attachment',
                };

                mailAttachments.push(data);
            });
        }

        if (mailData.attachment) {
            const data = {
                path: join(this.folderPathsService.mailTemporaryFiles, mailData.attachment.path),
                filename: mailData.attachment.filename,
                contentDisposition: 'attachment',
            };

            mailAttachments.push(data);
        }

        const sendMailOptions = {
            to: mailData.to,
            from: `${this.configService.mail.fromName} - ${this.configService.mail.from}`,
            subject: mailData.subject,
            template: mailData.template,
            context: {data: mailData.data, system: environments.appName},
            attachments: mailAttachments,
        };

        return await this.mailerService
            .sendMail(sendMailOptions)
            .then(response => {
                    return {accepted: response.accepted, rejected: response.rejected};
                },
                catchError(error => {
                    return error;
                }),
            );
    }
}
