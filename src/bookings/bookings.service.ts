import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './models/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking) private readonly bookingModel: typeof Booking,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingModel.create(createBookingDto);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingModel.findByPk(id, {
      include: { all: true },
    });
    if (!booking) {
      throw new NotFoundException(`Booking ID "${id}" topilmadi`);
    }
    return booking;
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const [affectedRows, [updateBooking]] = await this.bookingModel.update(
      updateBookingDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Booking ID "${id}" yangilanmadi`);
    }

    return updateBooking;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.bookingModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Booking ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
