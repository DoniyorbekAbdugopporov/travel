import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUser') createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Query(() => [User])
  async findAllUser(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async findOneUser(@Args('id', { type: () => ID }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateUser') updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => ID }) id: number) {
    return this.usersService.remove(id);
  }
}
