import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Activity } from './models/activity.model';
import { ActivitiesResolver } from './activities.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Activity])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, ActivitiesResolver],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
