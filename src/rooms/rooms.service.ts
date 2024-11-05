import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './models/room.model';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private readonly roomModel: typeof Room) {}

  async create(cancelledreateRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomModel.create(cancelledreateRoomDto);
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomModel.findByPk(id, {
      include: { all: true },
    });
    if (!room) {
      throw new NotFoundException(`Room ID "${id}" topilmadi`);
    }
    return room;
  }

  async update(
    id: number,
    updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    const [affectedRows, [updateRoom]] = await this.roomModel.update(
      updateRoomDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Room ID "${id}" yangilanmadi`);
    }

    return updateRoom;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.roomModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Room ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}

