import { TransportsService } from './transports.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { Transport } from './models/transport.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Transport)
export class TransportsResolver {
  constructor(private readonly transportsService: TransportsService) {}

  @Mutation(() => Transport)
  async createTransport(
    @Args('createTransport') createTransportDto: CreateTransportDto,
  ): Promise<Transport> {
    return this.transportsService.create(createTransportDto);
  }

  @Query(() => [Transport])
  async findAllTransport(): Promise<Transport[]> {
    return this.transportsService.findAll();
  }

  @Query(() => Transport)
  async findOneTransport(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Transport> {
    return this.transportsService.findOne(id);
  }

  @Mutation(() => Transport)
  async updateTransport(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateTransport') updateTransportDto: UpdateTransportDto,
  ): Promise<Transport> {
    return this.transportsService.update(id, updateTransportDto);
  }

  @Mutation(() => Boolean)
  async removeTransport(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.transportsService.remove(id);
  }
}
