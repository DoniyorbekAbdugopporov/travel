import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Activity } from './models/activity.model';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity) private readonly activityModel: typeof Activity,
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activityModel.create(createActivityDto);
  }

  async findAll(): Promise<Activity[]> {
    return this.activityModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityModel.findByPk(id, {
      include: { all: true },
    });
    if (!activity) {
      throw new NotFoundException(`Activity ID "${id}" topilmadi`);
    }
    return activity;
  }

  async update(
    id: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    const [affectedRows, [updateActivity]] = await this.activityModel.update(
      updateActivityDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Activity ID "${id}" yangilanmadi`);
    }

    return updateActivity;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.activityModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Activity ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
