import { Module } from '@nestjs/common';
import { TransportTypesService } from './transport_types.service';
import { TransportTypesController } from './transport_types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransportType } from './models/transport_type.model';

@Module({
  imports: [SequelizeModule.forFeature([TransportType])],
  controllers: [TransportTypesController],
  providers: [TransportTypesService],
  exports: [TransportTypesService],
})
export class TransportTypesModule {}
