import { TravelsService } from './travels.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './models/travel.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Travel)
export class TravelsResolver {
  constructor(private readonly travelsService: TravelsService) {}

  @Mutation(() => Travel)
  async createTravel(
    @Args('createTravel') createTravelDto: CreateTravelDto,
  ): Promise<Travel> {
    return this.travelsService.create(createTravelDto);
  }

  @Query(() => [Travel])
  async findAllTravel(): Promise<Travel[]> {
    return this.travelsService.findAll();
  }

  @Query(() => Travel)
  async findOneTravel(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Travel> {
    return this.travelsService.findOne(id);
  }

  @Mutation(() => Travel)
  async updateTravel(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateTravel') updateTravelDto: UpdateTravelDto,
  ): Promise<Travel> {
    return this.travelsService.update(id, updateTravelDto);
  }

  @Mutation(() => Boolean)
  async removeTravel(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.travelsService.remove(id);
  }
}
