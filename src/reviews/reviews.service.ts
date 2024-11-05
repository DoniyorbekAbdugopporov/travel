import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review) private readonly reviewModel: typeof Review,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = await this.reviewModel.create(createReviewDto);
    return review;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewModel.findByPk(id, {
      include: { all: true },
    });
    if (!review) {
      throw new NotFoundException(`Review ID "${id}" topilmadi`);
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const [affectedRows, [updateReview]] = await this.reviewModel.update(
      updateReviewDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Review ID "${id}" yangilanmadi`);
    }

    return updateReview;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.reviewModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Review ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
