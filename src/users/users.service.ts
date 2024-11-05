import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { SmsService } from 'src/sms/sms.service';
import { MailService } from 'src/mail/mail.service';
import { PhoneUserDto } from './dto/phone-user.dto';
import * as otpGenerator from 'otp-generator';
import { decode, encode } from 'src/common/helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Otp } from 'src/otp/models/otp.model';
import { AddMinutesToDate } from 'src/common/helpers/addMinutes';
import { SignInUserDto } from './dto/singin-user.dto';
import { BotService } from 'src/bot/bot.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly smsService: SmsService,
    private readonly mailService: MailService,
    private readonly botService: BotService,
  ) {}

  // Email orqali foydalanuvchini topish
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        `Foydalanuvchi "${email}" email orqali topilmadi`,
      );
    }
    return user;
  }

  // Refresh tokenni cookie-ga joylashtirish
  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_MS),
      secure: true,
      sameSite: 'strict',
    });
  }

  // User uchun tokenlar yaratish
  async generateTokensWithUser(user: User) {
    const payload = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      is_active: user.is_active,
    };

    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(payload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }),
      ]);

      return { access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException(
        'Token yaratishda xatolik yuz berdi',
      );
    }
  }

  // Refresh tokenni yangilash
  async updateRefreshTokenUser(id: number, refreshToken: string) {
    try {
      const hashed_refresh_token = await bcrypt.hash(refreshToken, 10);
      await this.userModel.update({ hashed_refresh_token }, { where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Refresh tokenni yangilashda xatolik yuz berdi',
      );
    }
  }

  // Userni ro‘yxatdan o‘tkazish
  async signUpUser(createUserDto: CreateUserDto, res: Response) {
    try {
      const user = await this.userModel.findOne({
        where: { email: createUserDto.email },
      });
      if (user) {
        throw new BadRequestException('Bunday foydalanuvchi mavjud');
      }
      if (createUserDto.password !== createUserDto.confirm_password) {
        throw new BadRequestException('Parollar mos emas');
      }
      const hashed_password = await bcrypt.hash(createUserDto.password, 10);

      const newUser = await this.userModel.create({
        ...createUserDto,
        hashed_password,
      });

      const tokens = await this.generateTokensWithUser(newUser);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

      const activation_link = uuid.v4();

      const updatedUser = await this.userModel.update(
        {
          hashed_refresh_token,
          activation_link,
        },
        {
          where: { id: newUser.id },
          returning: true,
        },
      );

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      try {
        await this.mailService.sendMail(updatedUser[1][0]);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException('Xat yuborishda xatoik!');
      }

      const response = {
        message: 'User registered successfully!',
        user: updatedUser[1][0],
        access_token: tokens.access_token,
      };
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || "Ro'yxatdan o'tishda xatolik yuz berdi",
      );
    }
  }

  // Activate User
  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updateUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      },
    );
    if (!updateUser[1][0]) {
      throw new BadRequestException('User already activated');
    }

    const response = {
      message: 'User activated successfully!',
      data: {
        full_name: updateUser[1][0].full_name,
        email: updateUser[1][0].email,
        is_active: updateUser[1][0].is_active,
      },
    };
    return response;
  }

  // User tizimga kirish
  async signInUser(signInUserDto: SignInUserDto, res: Response) {
    try {
      const user = await this.userModel.findOne({
        where: { email: signInUserDto.email },
      });
      if (!user) {
        throw new BadRequestException('User not found!');
      }

      if (!user.is_active) {
        throw new BadRequestException('User is not active!');
      }

      const isPasswordValid = await bcrypt.compare(
        signInUserDto.password,
        user.hashed_password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException("Email yoki parol noto'g'ri");
      }

      const tokens = await this.generateTokensWithUser(user);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

      const updatedUser = await this.userModel.update(
        { hashed_refresh_token, is_active: true },
        { where: { id: user.id }, returning: true },
      );

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      const response = {
        message: 'User sign in successfully!',
        data: {
          full_name: updatedUser[1][0].full_name,
          email: updatedUser[1][0].email,
          is_active: updatedUser[1][0].is_active,
        },
        access_token: tokens.access_token,
      };

      return response;
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Tizimga kirishda xatolik yuz berdi',
      );
    }
  }

  // Userni tizimdan chiqish
  async signOutUser(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!payload) {
        throw new BadRequestException('User is not verified');
      }

      const user = await this.userModel.findOne(payload.id);
      if (!user) {
        throw new NotFoundException('User topilmadi');
      }

      const updateUser = await this.userModel.update(
        { hashed_refresh_token: null, is_active: false },
        { where: { id: user.id }, returning: true },
      );

      res.clearCookie('refresh_token');

      const response = {
        message: 'User sign out successfully!',
        user: updateUser[1][0].is_active,
      };

      return response;
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Tizimdan chiqishda xatolik yuz berdi',
      );
    }
  }

  // User uchun refresh tokenni yangilash
  async refreshTokenWithUser(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const user = await this.userModel.findOne({
        where: { id: payload.id },
      });

      if (!user) {
        throw new UnauthorizedException('Foydalanuvchi topilmadi');
      }

      if (!user.hashed_refresh_token) {
        throw new UnauthorizedException(
          "Refresh token mavjud emas yoki noto'g'ri",
        );
      }

      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        user.hashed_refresh_token,
      );
      if (!isRefreshTokenValid) {
        throw new UnauthorizedException("Refresh token noto'g'ri");
      }

      const tokens = await this.generateTokensWithUser(user);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

      await this.userModel.update(
        { hashed_refresh_token },
        { where: { id: user.id } },
      );

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      const response = {
        message: 'User refreshed successfully!',
        data: {
          full_name: user.full_name,
          email: user.email,
          is_active: user.is_active,
        },
        access_token: tokens.access_token,
      };

      return response;
    } catch (error) {
      // Token muddati tugagan yoki boshqa xatoliklar uchun UnauthorizedException chiqarish
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token muddati tugagan');
      }
      throw new UnauthorizedException(
        error.message || 'Refresh token yangilashda xatolik yuz berdi',
      );
    }
  }

  // Otp yaratish
  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone_number;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // BOT
    const isSend = await this.botService.sendOtp(phone_number, otp);

    if (!isSend) {
      throw new BadRequestException("Avval ro'yhatdan o'ting");
    }

    // SMS
    const response = await this.smsService.sendSMS(phone_number, otp);

    if (response.status === 200) {
      throw new ServiceUnavailableException('OTP yuborishda xatolik!');
    }

    const message =
      `OTP code has been send to ****` +
      phone_number.slice(phone_number.length - 4);

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });

    const newOtp = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      expiration_time,
      phone_number,
    });
    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtp.id,
    };
    const encodedData = await encode(JSON.stringify(details));

    return { message, details: encodedData };
  }

  async veifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, phone_number } = verifyOtpDto;
    const currentDate = new Date();
    const decodedData = await decode(verification_key);
    const deatails = JSON.parse(decodedData);
    if (deatails.phone_number !== phone_number) {
      throw new BadRequestException('OTP bu raqamga yuborilmagan');
    }
    const resultOtp = await this.otpModel.findOne({
      where: { id: deatails.otp_id },
    });
    if (!resultOtp) {
      throw new BadRequestException('Bunday otp mavjud emas');
    }
    if (resultOtp.verified) {
      throw new BadRequestException('Bu OTP avval tekshirilgan');
    }
    if (resultOtp.expiration_time < currentDate) {
      throw new BadRequestException('Bu OTP avval vaqti tugagan');
    }
    if (resultOtp.otp !== otp) {
      throw new BadRequestException('OTP mos emas');
    }
    const user = await this.userModel.update(
      {
        is_active: true,
      },
      { where: { phone_number }, returning: true },
    );
    if (!user[1][0]) {
      throw new BadRequestException('Bunday foydalanuvchi yoq');
    }
    await this.otpModel.update(
      {
        verified: true,
      },
      { where: { id: deatails.otp_id } },
    );

    const responser = {
      message: "Siz activ bo'ldingiz",
      is_active: user[1][0].is_active,
    };

    return responser;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Bunday foydalanuvchi allaqachon mavjud');
    }

    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userModel.create({
      ...createUserDto,
      hashed_password: hashedPassword,
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      include: { all: true },
    });
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi ID "${id}" topilmadi`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi ID "${id}" topilmadi`);
    }
    // Parol o‘zgartirilayotgan bo‘lsa, uni hash qilamiz
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const [affectedRows, [updatedUser]] = await this.userModel.update(
      updateUserDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Foydalanuvchi ID "${id}" yangilanmadi`);
    }

    return updatedUser;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.userModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Foydalanuvchi ID "${id}" topilmadi`);
    }
    return affectedRows;
  }
}
