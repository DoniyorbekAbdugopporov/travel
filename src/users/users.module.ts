import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Otp } from 'src/otp/models/otp.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { OtpModule } from 'src/otp/otp.module';
import { SmsModule } from 'src/sms/sms.module';
import { UsersResolver } from './users.resolver';
import { Bot } from 'src/bot/models/bot.model';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Otp, Bot]),
    JwtModule.register({}),
    MailModule,
    OtpModule,
    SmsModule,
    BotModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
