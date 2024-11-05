import { Module } from '@nestjs/common';
import { TransactionLogsService } from './transaction_logs.service';
import { TransactionLogsController } from './transaction_logs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionLog } from './models/transaction_log.model';
import { TransactionLogsResolver } from './transaction_logs.resolver';

@Module({
  imports: [SequelizeModule.forFeature([TransactionLog])],
  controllers: [TransactionLogsController],
  providers: [TransactionLogsService, TransactionLogsResolver],
  exports: [TransactionLogsService],
})
export class TransactionLogsModule {}
