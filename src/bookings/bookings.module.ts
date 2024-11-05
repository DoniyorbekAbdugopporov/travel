import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './models/booking.entity';
import { BookingsResolver } from './bookings.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Booking])],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsResolver],
  exports: [BookingsService],
})
export class BookingsModule {}
