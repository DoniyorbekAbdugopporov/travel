import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './models/booking.entity';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Mutation(() => Booking)
  async createBooking(
    @Args('createBooking') createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    return this.bookingsService.create(createBookingDto);
  }

  @Query(() => [Booking])
  async findAllBooking(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @Query(() => Booking)
  async findOneBooking(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Booking> {
    return this.bookingsService.findOne(id);
  }

  @Mutation(() => Booking)
  async updateBooking(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateBooking') updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Mutation(() => Boolean)
  async removeBooking(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.bookingsService.remove(id);
  }
}
