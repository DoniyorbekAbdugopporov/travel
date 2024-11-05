import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './models/activity.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Mutation(() => Activity)
  async createActivity(
    @Args('createActivity') createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    return this.activitiesService.create(createActivityDto);
  }

  @Query(() => [Activity])
  async findAllActivity(): Promise<Activity[]> {
    return this.activitiesService.findAll();
  }

  @Query(() => Activity)
  async findOneActivity(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Activity> {
    return this.activitiesService.findOne(id);
  }

  @Mutation(() => Activity)
  async updateActivity(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateActivity') updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Mutation(() => Boolean)
  async removeActivity(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.activitiesService.remove(id);
  }
}
