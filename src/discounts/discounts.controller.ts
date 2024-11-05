import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './models/discount.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Discounts (Chegirmalar)')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @ApiOperation({ summary: "Yangi Chegirma qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Chegirma qoshish',
    type: Discount,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createDiscountDto: CreateDiscountDto,
  ): Promise<Discount> {
    return this.discountsService.create(createDiscountDto);
  }

  @ApiOperation({ summary: 'Chegirmalarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Chegirmalarni chiqarish',
    type: [Discount],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Discount[]> {
    return this.discountsService.findAll();
  }

  @ApiOperation({ summary: 'Chegirmani id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Chegirmani Id orqali topish',
    type: Discount,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Discount> {
    return this.discountsService.findOne(id);
  }

  @ApiOperation({ summary: 'Chegirmani id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Chegirmani Id orqali yangilash',
    type: Discount,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    return this.discountsService.update(id, updateDiscountDto);
  }

  @ApiOperation({ summary: 'Chegirmani id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Chegirmani Id orqali ochirish',
    type: Discount,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.discountsService.remove(id);
  }
}
