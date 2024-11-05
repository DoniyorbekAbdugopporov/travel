import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Travel } from './models/travel.model';

@Module({
  imports: [SequelizeModule.forFeature([Travel])],
  controllers: [TravelsController],
  providers: [TravelsService, TravelsService],
  exports: [TravelsService],
})
export class TravelsModule {}
