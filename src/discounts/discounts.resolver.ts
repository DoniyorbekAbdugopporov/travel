import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './models/discount.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Discount)
export class DiscountsResolver {
  constructor(private readonly discountsService: DiscountsService) {}

  @Mutation(() => Discount)
  async createDiscount(
    @Args('createDiscount') createDiscountDto: CreateDiscountDto,
  ): Promise<Discount> {
    return this.discountsService.create(createDiscountDto);
  }

  @Query(() => [Discount])
  async findAllDiscount(): Promise<Discount[]> {
    return this.discountsService.findAll();
  }

  @Query(() => Discount)
  async findOneDiscount(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Discount> {
    return this.discountsService.findOne(id);
  }

  @Mutation(() => Discount)
  async updateDiscount(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateDiscount') updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    return this.discountsService.update(id, updateDiscountDto);
  }

  @Mutation(() => Boolean)
  async removeDiscount(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.discountsService.remove(id);
  }
}
