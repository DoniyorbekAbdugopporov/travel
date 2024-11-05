import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { PaymentMethodController } from './payment_method.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentMethod } from './models/payment_method.model';
import { PaymentMethodResolver } from './payment_method.resolver';

@Module({
  imports: [SequelizeModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PaymentMethodResolver],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
