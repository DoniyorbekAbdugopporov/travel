import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AdminSelfGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.admin.id, req.params.id);
    if (req.admin.is_creator) {
      return true;
    }
    if (req.admin.id != req.params.id) {
      throw new ForbiddenException('Ruxsat etilmagan admin');
    }
    return true;
  }
}
