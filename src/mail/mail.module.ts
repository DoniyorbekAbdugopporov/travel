import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_HOST'), // process.env.SMTP_HOST
          secure: false, // false for non-secure SMTP, set to true for secure connections
          auth: {
            user: config.get<string>('SMTP_USER'), // process.env.SMTP_USER
            pass: config.get<string>('SMTP_PASSWORD'), // process.env.SMTP_PASSWORD
          },
        },
        defaults: {
          from: `Turizm <${config.get<string>('SMTP_USER')}>`,
        },
        template: {
          dir: path.join(__dirname, '..', 'mail', 'templates'),
          adapter: new HandlebarsAdapter(),
          template: 'confirm',
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
