import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Booking } from './models/booking.entity';
import { UserGuard } from 'src/common/guards/user.guard';

@ApiTags('Bookings (Bronlar)')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiOperation({ summary: "Yangi Chegirma qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Bron qilish',
    type: Booking,
  })
  @UseGuards(UserGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingsService.create(createBookingDto);
  }

  @ApiOperation({ summary: 'Bronlarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'bronlarni chiqarish',
    type: [Booking],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @ApiOperation({ summary: 'Bronni id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Bronni Id orqali topish',
    type: Booking,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Booking> {
    return this.bookingsService.findOne(id);
  }

  @ApiOperation({ summary: 'Bronni id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Bronni Id orqali yangilash',
    type: Booking,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @ApiOperation({ summary: 'Bronni id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Bronni Id orqali ochirish',
    type: Booking,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.bookingsService.remove(id);
  }
}
