import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // `request.user` mavjudligini tekshirish
    if (!request.user) {
      throw new UnauthorizedException({
        message: 'Foydalanuvchi tizimga kirmagan',
      });
    }

    // Foydalanuvchi `id` mosligini tekshirish
    if (String(request.user.sub) !== String(request.params.id)) {
      throw new ForbiddenException({
        message: 'Ruxsat etilmagan foydalanuvchi',
      });
    }

    return true;
  }
}
