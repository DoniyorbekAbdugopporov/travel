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
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Room } from './models/room.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Rooms (Xonalar)')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({ summary: "Yangi Xona qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Xona qoshish',
    type: Room,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomsService.create(createRoomDto);
  }

  @ApiOperation({ summary: 'Xonalarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Xonalarni chiqarish',
    type: [Room],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @ApiOperation({ summary: 'Xonani id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Xonani Id orqali topish',
    type: Room,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @ApiOperation({ summary: 'Xonani id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Xonani Id orqali yangilash',
    type: Room,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomsService.update(id, updateRoomDto);
  }

  @ApiOperation({ summary: 'Xonani id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Xonani Id orqali ochirish',
    type: Room,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.roomsService.remove(id);
  }
}
