import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class CreatorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Agar `request.user` mavjud bo'lmasa, u holda `UnauthorizedException` tashlaymiz.
    if (!request.user) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi tizimga kirmagan",
      });
    }

    // Foydalanuvchi yaratish huquqiga ega emasligi tekshiriladi
    if (!request.user.is_creator) {
      throw new ForbiddenException({
        message: "Ruxsat etilmagan foydalanuvchi",
      });
    }

    return true;
  }
}
