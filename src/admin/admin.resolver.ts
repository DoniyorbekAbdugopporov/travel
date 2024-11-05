import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => Admin)
  async createAdmin(
    @Args('createAdmin') createAdminDto: CreateAdminDto,
  ): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Query(() => [Admin])
  async findAllAdmin(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Query(() => Admin)
  async findOneAdmin(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  async updateAdmin(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateAdmin') updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminService.update(id, updateAdminDto);
  }

  @Mutation(() => Boolean)
  async removeAdmin(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.adminService.remove(id);
  }
}
