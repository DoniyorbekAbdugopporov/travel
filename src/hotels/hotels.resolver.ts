import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './models/hotel.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Hotel)
export class HotelsResolver {
  constructor(private readonly hotelsService: HotelsService) {}

  @Mutation(() => Hotel)
  async createHotel(
    @Args('createhotel') createHotelDto: CreateHotelDto,
  ): Promise<Hotel> {
    return this.hotelsService.create(createHotelDto);
  }

  @Query(() => [Hotel])
  async findAllHotel(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }

  @Query(() => Hotel)
  async findOneHotel(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Hotel> {
    return this.hotelsService.findOne(id);
  }

  @Mutation(() => Hotel)
  async updateHotel(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateHotel') updateHotelDto: UpdateHotelDto,
  ): Promise<Hotel> {
    return this.hotelsService.update(id, updateHotelDto);
  }

  @Mutation(() => Boolean)
  async removeHotel(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.hotelsService.remove(id);
  }
}
