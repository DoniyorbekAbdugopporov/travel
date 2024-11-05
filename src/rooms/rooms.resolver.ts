import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './models/room.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room)
  async createRoom(
    @Args('createRoom') createRoomDto: CreateRoomDto,
  ): Promise<Room> {
    return this.roomsService.create(createRoomDto);
  }

  @Query(() => [Room])
  async findAllRoom(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Query(() => Room)
  async findOneRoom(@Args('id', { type: () => ID }) id: number): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @Mutation(() => Room)
  async updateRoom(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateRoom') updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Mutation(() => Room)
  async removeRoom(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.roomsService.remove(id);
  }
}
