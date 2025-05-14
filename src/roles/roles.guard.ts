import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from 'src/common/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!requredRoles) return true
    const { user } = context.switchToHttp().getRequest()
    return requredRoles.some(( role ) => user.role?.includes(role));
  }
}
