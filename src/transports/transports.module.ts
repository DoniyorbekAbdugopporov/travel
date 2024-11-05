import { Module } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { TransportsController } from './transports.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transport } from './models/transport.model';

@Module({
  imports: [SequelizeModule.forFeature([Transport])],
  controllers: [TransportsController],
  providers: [TransportsService],
  exports: [TransportsService],
})
export class TransportsModule {}
