import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './models/image.model';

@Injectable()
export class ImagesService {
  constructor(@InjectModel(Image) private readonly imageModel: typeof Image) {}

  async create(createImageDto: CreateImageDto): Promise<Image> {
    return this.imageModel.create(createImageDto);
  }

  async findAll(): Promise<Image[]> {
    return this.imageModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imageModel.findByPk(id, {
      include: { all: true },
    });
    if (!image) {
      throw new NotFoundException(`Image ID "${id}" topilmadi`);
    }
    return image;
  }

  async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
    const [affectedRows, [updateImage]] = await this.imageModel.update(
      updateImageDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Image ID "${id}" yangilanmadi`);
    }

    return updateImage;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.imageModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Image ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
