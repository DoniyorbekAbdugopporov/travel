import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discount } from './models/discount.model';
import { DiscountsResolver } from './discounts.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Discount])],
  controllers: [DiscountsController],
  providers: [DiscountsService, DiscountsResolver],
  exports: [DiscountsService],
})
export class DiscountsModule {}
