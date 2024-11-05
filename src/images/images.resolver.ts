import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './models/image.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation(() => Image)
  async createImage(
    @Args('createImage') createImageDto: CreateImageDto,
  ): Promise<Image> {
    return this.imagesService.create(createImageDto);
  }

  @Query(() => [Image])
  async findAllImage(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  @Query(() => Image)
  async findOneImage(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Image> {
    return this.imagesService.findOne(id);
  }

  @Mutation(() => Image)
  async updateImage(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateImage') updateImageDto: UpdateImageDto,
  ): Promise<Image> {
    return this.imagesService.update(id, updateImageDto);
  }

  @Mutation(() => Boolean)
  async removeImage(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<number> {
    return this.imagesService.remove(id);
  }
}
