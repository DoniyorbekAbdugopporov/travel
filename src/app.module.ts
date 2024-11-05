import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { AdminModule } from './admin/admin.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OtpModule } from './otp/otp.module';
import { SmsModule } from './sms/sms.module';
import { MailModule } from './mail/mail.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BookingsModule } from './bookings/bookings.module';
import { DiscountsModule } from './discounts/discounts.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { PaymentsModule } from './payments/payments.module';
import { TransactionLogsModule } from './transaction_logs/transaction_logs.module';
import { TravelsModule } from './travels/travels.module';
import { ActivitiesModule } from './activities/activities.module';
import { ImagesModule } from './images/images.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { TransportTypesModule } from './transport_types/transport_types.module';
import { TransportsModule } from './transports/transports.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
        middlewares: [],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
      sync: { alter: true },
      synchronize: true,
      logging: false,
    }),
    AdminModule,
    AuthModule,
    UsersModule,
    OtpModule,
    SmsModule,
    MailModule,
    ReviewsModule,
    BookingsModule,
    DiscountsModule,
    PaymentMethodModule,
    PaymentsModule,
    TransactionLogsModule,
    TravelsModule,
    ActivitiesModule,
    ImagesModule,
    HotelsModule,
    RoomsModule,
    TransportTypesModule,
    TransportsModule,
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
