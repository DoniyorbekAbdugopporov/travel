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
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';

@ApiTags('Payments (Tolovlar)')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: "Yangi To'lov qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Tolov qilish',
    type: Payment,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'Tolovlarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Tolovlarni chiqarish',
    type: [Payment],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @ApiOperation({ summary: 'Tolovni id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Tolovni Id orqali topish',
    type: Payment,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  @ApiOperation({ summary: 'Tolovni id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Tolovni Id orqali yangilash',
    type: Payment,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Tolovni id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Tolovni Id orqali ochirish',
    type: Payment,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.paymentsService.remove(id);
  }
}
