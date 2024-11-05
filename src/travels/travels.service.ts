import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Travel } from './models/travel.model';

@Injectable()
export class TravelsService {
  constructor(
    @InjectModel(Travel) private readonly travelModel: typeof Travel,
  ) {}

  async create(createTravelDto: CreateTravelDto): Promise<Travel> {
    const travel = await this.travelModel.create(createTravelDto);
    return travel;
  }

  async findAll(): Promise<Travel[]> {
    return this.travelModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Travel> {
    const travel = await this.travelModel.findByPk(id, {
      include: { all: true },
    });
    if (!travel) {
      throw new NotFoundException(`Travel ID "${id}" topilmadi`);
    }
    return travel;
  }

  async update(id: number, updateTravelDto: UpdateTravelDto): Promise<Travel> {
    const [affectedRows, [updateTravel]] = await this.travelModel.update(
      updateTravelDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Travel ID "${id}" yangilanmadi`);
    }

    return updateTravel;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.travelModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Travel ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
