import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionLogsService } from './transaction_logs.service';
import { CreateTransactionLogDto } from './dto/create-transaction_log.dto';
import { UpdateTransactionLogDto } from './dto/update-transaction_log.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionLog } from './models/transaction_log.model';

@ApiTags('Transaction Logs (Tolovlar loglari)')
@Controller('transaction-logs')
export class TransactionLogsController {
  constructor(
    private readonly transactionLogsService: TransactionLogsService,
  ) {}

  @ApiOperation({ summary: "Yangi Transaction Log qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Transaction Log qilish',
    type: TransactionLog,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createTransactionLogDto: CreateTransactionLogDto,
  ): Promise<TransactionLog> {
    return this.transactionLogsService.create(createTransactionLogDto);
  }

  @ApiOperation({ summary: 'Transaction loglarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Transaction loglarni chiqarish',
    type: [TransactionLog],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<TransactionLog[]> {
    return this.transactionLogsService.findAll();
  }

  @ApiOperation({ summary: 'Transaction Logni id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Transaction Logni Id orqali topish',
    type: TransactionLog,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TransactionLog> {
    return this.transactionLogsService.findOne(id);
  }

  @ApiOperation({ summary: 'Transaction Logni id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Transaction Logni Id orqali yangilash',
    type: TransactionLog,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTransactionLogDto: UpdateTransactionLogDto,
  ): Promise<TransactionLog> {
    return this.transactionLogsService.update(id, updateTransactionLogDto);
  }

  @ApiOperation({ summary: 'Transaction Logni id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Transaction Logni Id orqali ochirish',
    type: TransactionLog,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.transactionLogsService.remove(id);
  }
}
