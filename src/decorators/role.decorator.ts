import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Role } from "../enums/roles.enum";
import { Reflector } from "@nestjs/core";


export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true;
    }
    const  user  = context.switchToHttp().getRequest().body.user;
    const hasRole = () => requiredRoles.some((role) => user.roles?.includes(role));

    return user && user.roles && hasRole();
  }
}


