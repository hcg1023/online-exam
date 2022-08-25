import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IdentityEnum } from '@online-exam/contants';
import { ROLES_KEY } from './role.decorator';
import { ViewUserDto } from '../user/dto/view-user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<IdentityEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<{ user: ViewUserDto }>();
    const result = requiredRoles.some((role) => user.identity === role);
    if (!result) {
      throw new UnauthorizedException();
    }
    return result;
  }
}
