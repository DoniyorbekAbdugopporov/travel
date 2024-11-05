import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransportTypeDto } from './dto/create-transport_type.dto';
import { UpdateTransportTypeDto } from './dto/update-transport_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TransportType } from './models/transport_type.model';

@Injectable()
export class TransportTypesService {
  constructor(
    @InjectModel(TransportType)
    private readonly transportTypeModel: typeof TransportType,
  ) {}

  async create(
    createTransportTypeDto: CreateTransportTypeDto,
  ): Promise<TransportType> {
    return this.transportTypeModel.create(createTransportTypeDto);
  }

  async findAll(): Promise<TransportType[]> {
    return this.transportTypeModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<TransportType> {
    const TransportType = await this.transportTypeModel.findByPk(id, {
      include: { all: true },
    });
    if (!TransportType) {
      throw new NotFoundException(`Transport Type ID "${id}" topilmadi`);
    }
    return TransportType;
  }

  async update(
    id: number,
    updateTransportTypeDto: UpdateTransportTypeDto,
  ): Promise<TransportType> {
    const [affectedRows, [updateTransportType]] =
      await this.transportTypeModel.update(updateTransportTypeDto, {
        where: { id },
        returning: true,
      });

    if (affectedRows === 0) {
      throw new NotFoundException(`Transport Type ID "${id}" yangilanmadi`);
    }

    return updateTransportType;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.transportTypeModel.destroy({
      where: { id },
    });
    if (affectedRows === 0) {
      throw new NotFoundException(`TransportType ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
