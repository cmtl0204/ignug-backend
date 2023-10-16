import { Global, Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { FilesController } from '@common/controllers';
import { FilesService } from '@common/services';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from '@config';
import { ConfigType } from '@nestjs/config';
import { join } from 'path';
import { commonProviders } from '@common/providers';
import { MailService } from '@common/services';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => ({
        transport: {
          host: configService.mail.host,
          port: configService.mail.port,
          secure:false,
          auth: {
            user: configService.mail.user,
            pass: configService.mail.pass,
          },
        },
        defaults: {
          from: configService.mail.from,
        },
        template: {
          // dir: join(__dirname, 'mail', `./${configService.mail.dir}`),
          dir: join(process.cwd(), 'src/resources/mails', `./${configService.mail.dir}`),

          adapter: new HandlebarsAdapter(),
          options: {
            static: true,
          },
        },
      }),
    }),
  ],
  controllers: [FilesController],
  providers: [...commonProviders, FilesService, MailService],
  exports: [...commonProviders, FilesService, MailService],
})
export class CommonModule {}
