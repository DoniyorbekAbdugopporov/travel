import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Res,
  Req,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { Request, Response } from 'express';
import { PhoneUserDto } from './dto/phone-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { CookieGetter } from 'src/common/decorators/cookie_getter.decorator';
import { SignInUserDto } from './dto/singin-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserGuard } from 'src/common/guards/user.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('User (Userlar)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // userRouters
  @ApiOperation({ summary: "Yangi User qo'shish" })
  @ApiResponse({
    status: 201,
    description: "User muvaffaqiyatli qo'shildi",
    type: User,
    schema: {
      example: {
        message: "User muvaffaqiyatli ro'yxatdan o'tdi!",
        user: {
          id: 1,
          email: 'user',
          is_active: true,
        },
        access_token: 'access_token',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUpUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.signUpUser(createUserDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('newotp')
  async newOtp(
    @Body() phoneUserDto: PhoneUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.newOtp(phoneUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.veifyOtp(verifyOtpDto);
  }

  @ApiOperation({ summary: 'Userni faollashtirish' })
  @ApiResponse({
    status: 200,
    description: 'Userni faollashtirish',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Get('activate/:link')
  async activateUser(@Param('link') link: string) {
    return this.usersService.activateUser(link);
  }

  @ApiOperation({ summary: 'Userni tizimga kiritish (signIn)' })
  @ApiResponse({
    status: 200,
    description: 'Tizimga kirish muvaffaqiyatli',
    type: User,
    schema: {
      example: {
        message: 'Tizimga muvaffaqiyatli kirildi',
        user: {
          id: 1,
          email: 'user@gmail.com',
          is_active: true,
        },
        access_token: 'access_token',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signInUser(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.signInUser(signInUserDto, res);
  }

  @ApiOperation({ summary: 'Userni tizimdan chiqarish (signOut)' })
  @ApiResponse({
    status: 200,
    description: 'User tizimdan muvaffaqiyatli chiqarildi',
    type: User,
    schema: {
      example: {
        message: 'Tizimdan muvaffaqiyatli chiqildi',
      },
    },
  })
  @UseGuards(UserGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signOutUser(
    @Req() req: Request,
    // @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new BadRequestException('Refresh token mavjud emas');
    }
    return this.usersService.signOutUser(refreshToken, res);
  }

  @ApiOperation({ summary: 'Yangi access token olish (refreshToken)' })
  @ApiResponse({
    status: 200,
    description: 'Yangi access token berildi',
    type: User,
    schema: {
      example: {
        access_token: 'yangi_access_token',
      },
    },
  })
  @UseGuards(UserGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokenUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new BadRequestException('Refresh token mavjud emas');
    }
    return this.usersService.refreshTokenWithUser(refreshToken, res);
  }

  @ApiOperation({ summary: "Yangi User qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'User qoshish',
    type: User,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Userlarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Userlar',
    type: [User],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'User nomini id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'User nomini Id orqali topish',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'User nomini id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'User nomini Id orqali yangilash',
    type: User,
  })
  @UseGuards(UserGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "User nomini id orqli o'chirish" })
  @ApiResponse({
    status: 200,
    description: "User nomini Id orqali o'chirish",
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.usersService.remove(id);
  }
}
