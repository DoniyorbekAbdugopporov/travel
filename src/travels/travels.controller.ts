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
import { TravelsService } from './travels.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Travel } from './models/travel.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Travels (Sayohatlar)')
@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @ApiOperation({ summary: "Yangi Sayohat qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Sayohat qoshish',
    type: Travel,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createTravelDto: CreateTravelDto): Promise<Travel> {
    return this.travelsService.create(createTravelDto);
  }

  @ApiOperation({ summary: 'Sayohatlarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Sayohatlarni chiqarish',
    type: [Travel],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Travel[]> {
    return this.travelsService.findAll();
  }

  @ApiOperation({ summary: 'Sayohatni id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Sayohatni Id orqali topish',
    type: Travel,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Travel> {
    return this.travelsService.findOne(id);
  }

  @ApiOperation({ summary: 'Travelni id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Travelni Id orqali yangilash',
    type: Travel,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTravelDto: UpdateTravelDto,
  ): Promise<Travel> {
    return this.travelsService.update(id, updateTravelDto);
  }

  @ApiOperation({ summary: 'Sayohatno id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Sayohatno Id orqali ochirish',
    type: Travel,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.travelsService.remove(id);
  }
}
