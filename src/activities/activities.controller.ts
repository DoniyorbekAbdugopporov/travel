import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Activity } from './models/activity.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Activities (Tadbirlar)')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @ApiOperation({ summary: "Yangi Tadbir qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Tadbir qoshish',
    type: Activity,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    return this.activitiesService.create(createActivityDto);
  }

  @ApiOperation({ summary: 'Tadbirlarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Tadbirlarni chiqarish',
    type: [Activity],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Activity[]> {
    return this.activitiesService.findAll();
  }

  @ApiOperation({ summary: 'Tadbirni id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Tadbirni Id orqali topish',
    type: Activity,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Activity> {
    return this.activitiesService.findOne(id);
  }

  @ApiOperation({ summary: 'Tadbirni id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Tadbirni Id orqali yangilash',
    type: Activity,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @ApiOperation({ summary: 'Tadbirni id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Tadbirni Id orqali ochirish',
    type: Activity,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.activitiesService.remove(id);
  }
}
