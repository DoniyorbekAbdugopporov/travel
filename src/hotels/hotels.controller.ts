import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Hotel } from './models/hotel.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Hotels (Mehmonxonalar)')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @ApiOperation({ summary: "Yangi Mehmonxona qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Mehmonxona qoshish',
    type: Hotel,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
    return this.hotelsService.create(createHotelDto);
  }

  @ApiOperation({ summary: 'Mehmonxonalarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Mehmonxonalarni chiqarish',
    type: [Hotel],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }

  @ApiOperation({ summary: 'Mehmonxonani id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Mehmonxonani Id orqali topish',
    type: Hotel,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Hotel> {
    return this.hotelsService.findOne(id);
  }

  @ApiOperation({ summary: 'Mehmonxonani id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Mehmonxonani Id orqali yangilash',
    type: Hotel,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateHotelDto: UpdateHotelDto,
  ): Promise<Hotel> {
    return this.hotelsService.update(id, updateHotelDto);
  }

  @ApiOperation({ summary: 'Mehmonxonani id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Mehmonxonani Id orqali ochirish',
    type: Hotel,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.hotelsService.remove(id);
  }
}
