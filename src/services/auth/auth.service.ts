import { Injectable, NotAcceptableException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,    private jwtService: JwtService) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passwordValid = await bcrypt.compare(pass, user.password);
    if (user && passwordValid) {
      const { ['password']: remove, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}

export const jwtConstants = {
  secret: 'secretKey',
};