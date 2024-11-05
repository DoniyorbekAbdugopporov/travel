import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Authorization header mavjudligini tekshirish
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header mavjud emas');
    }

    // 'Bearer' va tokenni ajratib olish
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        "Authorization header 'Bearer <token>' ko'rinishida bo'lishi kerak",
      );
    }

    try {
      // JWT tokenni tekshirish va foydalanuvchi ma'lumotlarini olish
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      // Foydalanuvchi ma'lumotlarini request obyektiga o'rnatish
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException("Yaroqsiz yoki muddati o'tgan token");
    }

    return true;
  }
}
