import { TransactionLogsService } from './transaction_logs.service';
import { CreateTransactionLogDto } from './dto/create-transaction_log.dto';
import { UpdateTransactionLogDto } from './dto/update-transaction_log.dto';
import { TransactionLog } from './models/transaction_log.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => TransactionLog)
export class TransactionLogsResolver {
  constructor(
    private readonly transactionLogsService: TransactionLogsService,
  ) {}

  @Mutation(() => TransactionLog)
  async createTransactionLog(
    @Args('createTransactionLog')
    createTransactionLogDto: CreateTransactionLogDto,
  ): Promise<TransactionLog> {
    return this.transactionLogsService.create(createTransactionLogDto);
  }

  @Query(() => [TransactionLog])
  async findAllTransactionLog(): Promise<TransactionLog[]> {
    return this.transactionLogsService.findAll();
  }

  @Query(() => TransactionLog)
  async findOneTransactionLog(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<TransactionLog> {
    return this.transactionLogsService.findOne(id);
  }

  @Mutation(() => TransactionLog)
  async updateTransactionLog(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateTransactionLog')
    updateTransactionLogDto: UpdateTransactionLogDto,
  ): Promise<TransactionLog> {
    return this.transactionLogsService.update(id, updateTransactionLogDto);
  }

  @Mutation(() => Boolean)
  async removeTransactionLog(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.transactionLogsService.remove(id);
  }
}
