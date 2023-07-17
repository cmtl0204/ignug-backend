import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from '@config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => ({
        transport: {
          host: configService.mail.host,
          port: configService.mail.port,
          auth: {
            user: configService.mail.user,
            pass: configService.mail.pass,
          },
        },
        defaults: {
          from: configService.mail.from,
        },
        template: {
          dir: join(__dirname, `./${configService.mail.dir}`),
          adapter: new HandlebarsAdapter(),
          options: {
            static: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
