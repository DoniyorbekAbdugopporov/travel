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
import { TransportTypesService } from './transport_types.service';
import { CreateTransportTypeDto } from './dto/create-transport_type.dto';
import { UpdateTransportTypeDto } from './dto/update-transport_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransportType } from './models/transport_type.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Transport Types (Transport Turlari)')
@Controller('transport-types')
export class TransportTypesController {
  constructor(private readonly transportTypesService: TransportTypesService) {}

  @ApiOperation({ summary: "Yangi Transport turi qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Transport turi qoshish',
    type: TransportType,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createTransportTypeDto: CreateTransportTypeDto,
  ): Promise<TransportType> {
    return this.transportTypesService.create(createTransportTypeDto);
  }

  @ApiOperation({ summary: 'Transport turlarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Transport turlarni chiqarish',
    type: [TransportType],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<TransportType[]> {
    return this.transportTypesService.findAll();
  }

  @ApiOperation({ summary: 'Transport turini id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Transport turini Id orqali topish',
    type: TransportType,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TransportType> {
    return this.transportTypesService.findOne(id);
  }

  @ApiOperation({ summary: 'Transport turini id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Transport turini Id orqali yangilash',
    type: TransportType,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTransportTypeDto: UpdateTransportTypeDto,
  ): Promise<TransportType> {
    return this.transportTypesService.update(id, updateTransportTypeDto);
  }

  @ApiOperation({ summary: 'Transport turini id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Transport turini Id orqali ochirish',
    type: TransportType,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.transportTypesService.remove(id);
  }
}
