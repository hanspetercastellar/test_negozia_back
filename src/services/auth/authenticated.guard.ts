import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest()
      const authorization = request.headers.authorization;
      const token = authorization?.split(' ')[1];

      if (token) {
        const secretOrKey = process.env.JWT_SECRETORKEY;
        const payload: any = jwt.verify(token, secretOrKey);
      }
      console.log(request);
      return request.isAuthenticated()
    }catch (e) {

    }

  }
}