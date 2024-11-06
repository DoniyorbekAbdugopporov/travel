import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SignInAdminDto } from './dto';
import { Request, Response } from 'express';
import { CreatorGuard } from '../common/guards/creator.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags("Authorization (Ro'yhatdan o'tish)")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Yangi Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli qo'shildi",
    schema: {
      example: {
        message: "Admin muvaffaqiyatli ro'yxatdan o'tdi!",
        admin: {
          id: 1,
          email: 'admin',
          is_active: true,
          is_creator: true,
        },
        access_token: 'access_token',
      },
    },
  })
  @UseGuards(JwtAuthGuard, CreatorGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUpAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUpAdmin(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Adminni tizimga kiritish (signIn)' })
  @ApiResponse({
    status: 200,
    description: 'Tizimga kirish muvaffaqiyatli',
    schema: {
      example: {
        message: 'Tizimga muvaffaqiyatli kirildi',
        admin: {
          id: 1,
          email: 'admin@gmail.com',
          is_active: true,
        },
        access_token: 'access_token',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signInAdmin(
    @Body() signInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInAdmin(signInAdminDto, res);
  }

  @ApiOperation({ summary: 'Adminni tizimdan chiqarish (signOut)' })
  @ApiResponse({
    status: 200,
    description: 'Admin tizimdan muvaffaqiyatli chiqarildi',
    schema: {
      example: {
        message: 'Tizimdan muvaffaqiyatli chiqildi',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signOutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new BadRequestException('Refresh token mavjud emas');
    }
    return this.authService.signOutAdmin(refreshToken, res);
  }

  @ApiOperation({ summary: 'Yangi access token olish (refreshToken)' })
  @ApiResponse({
    status: 200,
    description: 'Yangi access token berildi',
    schema: {
      example: {
        access_token: 'yangi_access_token',
      },
    },
  })
  @UseGuards(JwtAuthGuard) // JwtAuthGuard himoyasini ishlatish
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokenAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Cookiesdan refresh tokenni olish
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new BadRequestException('Refresh token mavjud emas');
    }

    // Refresh token orqali yangi access token yaratish
    return this.authService.refreshTokenWithAdmin(refreshToken, res);
  }
}
