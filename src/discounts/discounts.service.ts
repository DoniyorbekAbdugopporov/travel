import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Discount } from './models/discount.model';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount) private readonly discountModel: typeof Discount,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const discount = await this.discountModel.create(createDiscountDto);
    return discount;
  }

  async findAll(): Promise<Discount[]> {
    return this.discountModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Discount> {
    const discount = await this.discountModel.findByPk(id, {
      include: { all: true },
    });
    if (!discount) {
      throw new NotFoundException(`Discount ID "${id}" topilmadi`);
    }
    return discount;
  }

  async update(
    id: number,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    const [affectedRows, [updateDiscount]] = await this.discountModel.update(
      updateDiscountDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Discount ID "${id}" yangilanmadi`);
    }

    return updateDiscount;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.discountModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Discount ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
