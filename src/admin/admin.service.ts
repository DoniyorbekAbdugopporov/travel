import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}

  async findAdminByEmail(email: string): Promise<Admin> {
    const admin = await this.adminModel.findOne({ where: { email } });
    if (!admin) {
      throw new NotFoundException(`Admin "${email}" email orqali topilmadi`);
    }
    return admin;
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const existingAdmin = await this.adminModel.findOne({
      where: { email: createAdminDto.email },
    });
    if (existingAdmin) {
      throw new BadRequestException('Bunday foydalanuvchi mavjud');
    }
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas!');
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const admin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password: hashedPassword,
    });

    return admin;
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.findAll();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id, {
      include: { all: true },
    });
    if (!admin) {
      throw new NotFoundException(`Admin ID "${id}" topilmadi`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin ID "${id}" topilmadi`);
    }

    // Parol o‘zgartirilayotgan bo‘lsa, uni hash qilamiz
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(
        updateAdminDto.password,
        10,
      );
    }

    const [affectedRows, [updatedAdmin]] = await this.adminModel.update(
      updateAdminDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(
        `Admin ID "${id}" yangilanmadi, chunki topilmadi`,
      );
    }

    return updatedAdmin;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.adminModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Admin ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
