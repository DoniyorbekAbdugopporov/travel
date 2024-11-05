import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './models/payment.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => Payment)
  async createPayment(
    @Args('createPayment') createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }

  @Query(() => [Payment])
  async findAllPayment(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Query(() => Payment)
  async findOnePayment(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  @Mutation(() => Payment)
  async updatePayment(
    @Args('id', { type: () => ID }) id: number,
    @Args('updatePayment') updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Mutation(() => Boolean)
  async removePayment(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.paymentsService.remove(id);
  }
}
