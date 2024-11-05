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
import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentMethod } from './models/payment_method.model';

@ApiTags('Payment Method (Tolov turlari)')
@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @ApiOperation({ summary: "Yangi To'lov turini qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Tolov turini qoshish',
    type: PaymentMethod,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @ApiOperation({ summary: 'Tolov turlarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Tolov turlarni chiqarish',
    type: [PaymentMethod],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @ApiOperation({ summary: 'Tolov turini id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Tolov turini Id orqali topish',
    type: PaymentMethod,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOne(+id);
  }

  @ApiOperation({ summary: 'Tolov turini id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Tolov turini Id orqali yangilash',
    type: PaymentMethod,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.update(+id, updatePaymentMethodDto);
  }

  @ApiOperation({ summary: 'Tolov turini id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Tolov turini Id orqali ochirish',
    type: PaymentMethod,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMethodService.remove(+id);
  }
}
