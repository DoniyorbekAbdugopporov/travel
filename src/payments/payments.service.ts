import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './models/payment.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentModel.create(createPaymentDto);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id, {
      include: { all: true },
    });
    if (!payment) {
      throw new NotFoundException(`Payment ID "${id}" topilmadi`);
    }
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const [affectedRows, [updatePayment]] = await this.paymentModel.update(
      updatePaymentDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Payment ID "${id}" yangilanmadi`);
    }

    return updatePayment;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.paymentModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Payment ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
