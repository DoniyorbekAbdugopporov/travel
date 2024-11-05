import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Transport } from './models/transport.model';

@Injectable()
export class TransportsService {
  constructor(
    @InjectModel(Transport) private readonly transportModel: typeof Transport,
  ) {}

  async create(createTransportDto: CreateTransportDto): Promise<Transport> {
    return this.transportModel.create(createTransportDto);
  }

  async findAll(): Promise<Transport[]> {
    return this.transportModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Transport> {
    const transport = await this.transportModel.findByPk(id, {
      include: { all: true },
    });
    if (!transport) {
      throw new NotFoundException(`Transport ID "${id}" topilmadi`);
    }
    return transport;
  }

  async update(
    id: number,
    updateTransportDto: UpdateTransportDto,
  ): Promise<Transport> {
    const [affectedRows, [updateTransport]] = await this.transportModel.update(
      updateTransportDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Transport ID "${id}" yangilanmadi`);
    }

    return updateTransport;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.transportModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Transport ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
