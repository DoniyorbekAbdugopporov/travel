import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInAdminDto} from './dto';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/admin/models/admin.model';
import { CreateAdminDto } from 'src/admin/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}

  // Refresh tokenni cookie-ga joylashtirish
  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_MS),
      secure: true,
      sameSite: 'strict',
    });
  }

  // Admin uchun tokenlar yaratish
  async generateTokensWithAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      full_name: admin.full_name,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY_ADMIN,
          expiresIn: process.env.ACCESS_TOKEN_TIME_ADMIN,
        }),
        this.jwtService.signAsync(payload, {
          secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
          expiresIn: process.env.REFRESH_TOKEN_TIME_ADMIN,
        }),
      ]);

      return { access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException(
        'Token yaratishda xatolik yuz berdi',
      );
    }
  }

  // Refresh Admin tokenni yangilash
  async updateRefreshTokenAdmin(id: number, refreshToken: string) {
    try {
      const hashed_refresh_token = await bcrypt.hash(refreshToken, 10);

      await this.adminService.update(id, { hashed_refresh_token });
    } catch (error) {
      throw new Error('Refresh tokenni yangilashda xatolik yuz berdi');
    }
  }

  // Adminni ro‘yxatdan o‘tkazish
  async signUpAdmin(createAdminDto: CreateAdminDto, res: Response) {
    try {
      const newAdmin = await this.adminService.create(createAdminDto);
      if (!newAdmin) {
        throw new InternalServerErrorException(
          'Yangi admin yaratishda xatolik',
        );
      }

      const tokens = await this.generateTokensWithAdmin(newAdmin);
      await this.updateRefreshTokenAdmin(newAdmin.id, tokens.refresh_token);

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      return {
        message: "Admin muvaffaqiyatli ro'yxatdan o'tdi!",
        admin: newAdmin,
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || "Ro'yxatdan o'tishda xatolik yuz berdi",
      );
    }
  }

  // Adminni tizimga kirish
  async signInAdmin(signInAdminDto: SignInAdminDto, res: Response) {
    try {
      const admin = await this.adminService.findAdminByEmail(
        signInAdminDto.email,
      );
      if (!admin) {
        throw new BadRequestException("Email yoki parol noto'g'ri");
      }

      const isPasswordValid = await bcrypt.compare(
        signInAdminDto.password,
        admin.hashed_password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException("Email yoki parol noto'g'ri");
      }

      await this.adminService.update(admin.id, { is_active: true });
      await admin.save()

      const tokens = await this.generateTokensWithAdmin(admin);
      await this.updateRefreshTokenAdmin(admin.id, tokens.refresh_token);

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      return {
        message: 'Tizimga muvaffaqiyatli kirildi',
        admin: {
          full_name: admin.full_name,
          email: admin.email,
          is_active: admin.is_active,
        },
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Tizimga kirishda xatolik yuz berdi',
      );
    }
  }

  // Adminni tizimdan chiqish
  async signOutAdmin(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminService.findOne(payload.id);
      if (!admin) {
        throw new NotFoundException('Admin topilmadi');
      }

      await this.adminService.update(admin.id, {
        is_active: false,
        hashed_refresh_token: null,
      });

      res.clearCookie('refresh_token');

      return { message: 'Tizimdan muvaffaqiyatli chiqildi' };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Tizimdan chiqishda xatolik yuz berdi',
      );
    }
  }

  // Admin uchun refresh tokenni yangilash
  async refreshTokenWithAdmin(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminService.findOne(payload.id);
      if (!admin || !admin.hashed_refresh_token) {
        throw new BadRequestException(
          "Admin topilmadi yoki refresh token noto'g'ri",
        );
      }

      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token,
      );
      if (!isRefreshTokenValid) {
        throw new BadRequestException("Refresh token noto'g'ri");
      }

      const tokens = await this.generateTokensWithAdmin(admin);
      await this.updateRefreshTokenAdmin(admin.id, tokens.refresh_token);

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      return { access_token: tokens.access_token };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Refresh token yangilashda xatolik yuz berdi',
      );
    }
  }
}
