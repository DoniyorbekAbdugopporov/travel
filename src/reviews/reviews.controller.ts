import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Review } from './models/review.model';

@ApiTags('Reviews (Sharhlar)')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: "Yangi Sharh qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Sharh qoshish',
    type: Review,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewsService.create(createReviewDto);
  }

  @ApiOperation({ summary: 'Sharhlarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Sharhlarni chiqarish',
    type: [Review],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @ApiOperation({ summary: 'Sharhni id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Sharhni Id orqali topish',
    type: Review,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @ApiOperation({ summary: 'Sharhni id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Sharhni Id orqali yangilash',
    type: Review,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @ApiOperation({ summary: 'Sharhni id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Sharhni Id orqali ochirish',
    type: Review,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.reviewsService.remove(id);
  }
}
