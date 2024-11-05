import { TransportTypesService } from './transport_types.service';
import { CreateTransportTypeDto } from './dto/create-transport_type.dto';
import { UpdateTransportTypeDto } from './dto/update-transport_type.dto';
import { TransportType } from './models/transport_type.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => TransportType)
export class TransportTypesResolver {
  constructor(private readonly transportTypesService: TransportTypesService) {}

  @Mutation(() => TransportType)
  async createTransportType(
    @Args('createTransportType') createTransportTypeDto: CreateTransportTypeDto,
  ): Promise<TransportType> {
    return this.transportTypesService.create(createTransportTypeDto);
  }

  @Query(() => [TransportType])
  async findAllTransportType(): Promise<TransportType[]> {
    return this.transportTypesService.findAll();
  }

  @Query(() => TransportType)
  async findOneTransportType(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<TransportType> {
    return this.transportTypesService.findOne(id);
  }

  @Mutation(() => TransportType)
  async updateTransportType(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateTransportType') updateTransportTypeDto: UpdateTransportTypeDto,
  ): Promise<TransportType> {
    return this.transportTypesService.update(id, updateTransportTypeDto);
  }

  @Mutation(() => TransportType)
  async removeTransportType(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.transportTypesService.remove(id);
  }
}
