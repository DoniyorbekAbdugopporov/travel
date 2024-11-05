import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PaymentMethod } from './models/payment_method.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Mutation(() => PaymentMethod)
  async createPaymentMethod(
    @Args('createPaymentMethod') createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Query(() => [PaymentMethod])
  async findAllPaymentMethod(): Promise<PaymentMethod[]> {
    return this.paymentMethodService.findAll();
  }

  @Query(() => PaymentMethod)
  async findOnePaymentMethod(
    @Args('id', { type: () => ID }) id: number, 
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.findOne(id);
  }

  @Mutation(() => PaymentMethod)
  async updatePaymentMethod(
    @Args('id', { type: () => ID }) id: number, 
    @Args('updatePaymentMethod') updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.update(id, updatePaymentMethodDto);
  }

  @Mutation(() => Boolean)
  async removePaymentMethod(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    const result = await this.paymentMethodService.remove(id);
    return result > 0;
  }
}
