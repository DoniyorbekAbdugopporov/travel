import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hotel } from './models/hotel.model';
import { HotelsResolver } from './hotels.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Hotel])],
  controllers: [HotelsController],
  providers: [HotelsService, HotelsResolver],
  exports: [HotelsService],
})
export class HotelsModule {}
