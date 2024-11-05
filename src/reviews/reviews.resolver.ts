import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './models/review.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  async createReview(
    @Args('createreview') createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return this.reviewsService.create(createReviewDto);
  }

  @Query(() => [Review])
  async findAllReview(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Query(() => Review)
  async findOneReview(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Mutation(() => Review)
  async updateReview(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateReview') updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Mutation(() => Boolean)
  async removeReview(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.reviewsService.remove(id);
  }
}
