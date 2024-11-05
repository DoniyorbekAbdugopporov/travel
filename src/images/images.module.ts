import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from './models/image.model';
import { ImagesResolver } from './images.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Image])],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesResolver],
  exports: [ImagesService],
})
export class ImagesModule {}
