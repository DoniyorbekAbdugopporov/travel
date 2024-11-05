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
import { TransportsService } from './transports.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transport } from './models/transport.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Transports (Transportlar)')
@Controller('transports')
export class TransportsController {
  constructor(private readonly transportsService: TransportsService) {}

  @ApiOperation({ summary: "Yangi Transport qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Transport qoshish',
    type: Transport,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createTransportDto: CreateTransportDto,
  ): Promise<Transport> {
    return this.transportsService.create(createTransportDto);
  }

  @ApiOperation({ summary: 'Transportlarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Transportlarni chiqarish',
    type: [Transport],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Transport[]> {
    return this.transportsService.findAll();
  }

  @ApiOperation({ summary: 'Transportni id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Transportni Id orqali topish',
    type: Transport,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Transport> {
    return this.transportsService.findOne(id);
  }

  @ApiOperation({ summary: 'Transportni id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Transportni Id orqali yangilash',
    type: Transport,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTransportDto: UpdateTransportDto,
  ): Promise<Transport> {
    return this.transportsService.update(id, updateTransportDto);
  }

  @ApiOperation({ summary: 'Transportni id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Transportni Id orqali ochirish',
    type: Transport,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.transportsService.remove(id);
  }
}
