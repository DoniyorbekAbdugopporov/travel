import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Hotel } from './models/hotel.model';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel) private readonly hotelModel: typeof Hotel) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    return this.hotelModel.create(createHotelDto);
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelModel.findByPk(id, {
      include: { all: true },
    });
    if (!hotel) {
      throw new NotFoundException(`Hotel ID "${id}" topilmadi`);
    }
    return hotel;
  }

  async update(id: number, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    const [affectedRows, [updateHotel]] = await this.hotelModel.update(
      updateHotelDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Hotel ID "${id}" yangilanmadi`);
    }

    return updateHotel;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.hotelModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Hotel ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
