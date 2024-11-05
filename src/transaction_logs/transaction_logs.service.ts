import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionLogDto } from './dto/create-transaction_log.dto';
import { UpdateTransactionLogDto } from './dto/update-transaction_log.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionLog } from './models/transaction_log.model';

@Injectable()
export class TransactionLogsService {
  constructor(
    @InjectModel(TransactionLog)
    private readonly transactionLogModel: typeof TransactionLog,
  ) {}

  async create(
    createTransactionLogDto: CreateTransactionLogDto,
  ): Promise<TransactionLog> {
    return this.transactionLogModel.create(createTransactionLogDto);
  }

  async findAll(): Promise<TransactionLog[]> {
    return this.transactionLogModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<TransactionLog> {
    const booking = await this.transactionLogModel.findByPk(id, {
      include: { all: true },
    });
    if (!booking) {
      throw new NotFoundException(`Transaction Log ID "${id}" topilmadi`);
    }
    return booking;
  }

  async update(
    id: number,
    updateTransactionLogDto: UpdateTransactionLogDto,
  ): Promise<TransactionLog> {
    const [affectedRows, [updateTransactionLog]] =
      await this.transactionLogModel.update(updateTransactionLogDto, {
        where: { id },
        returning: true,
      });

    if (affectedRows === 0) {
      throw new NotFoundException(`Transaction Log ID "${id}" yangilanmadi`);
    }

    return updateTransactionLog;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.transactionLogModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`TRansaction Log ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
