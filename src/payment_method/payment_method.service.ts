import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentMethod } from './models/payment_method.model';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod)
    private readonly paymentMethodModel: typeof PaymentMethod,
  ) {}

  async create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const discount = await this.paymentMethodModel.create(
      createPaymentMethodDto,
    );
    return discount;
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<PaymentMethod> {
    const discount = await this.paymentMethodModel.findByPk(id, {
      include: { all: true },
    });
    if (!discount) {
      throw new NotFoundException(`Discount ID "${id}" topilmadi`);
    }
    return discount;
  }

  async update(
    id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const [affectedRows, [updateDiscount]] =
      await this.paymentMethodModel.update(updatePaymentMethodDto, {
        where: { id },
        returning: true,
      });

    if (affectedRows === 0) {
      throw new NotFoundException(`Discount ID "${id}" yangilanmadi`);
    }

    return updateDiscount;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.paymentMethodModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Discount ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
