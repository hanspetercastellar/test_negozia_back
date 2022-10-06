import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport/dist"
import { UserModule } from "../user/user.module";
import { AuthService, jwtConstants } from "../../services/auth/auth.service";
import { LocalStrategy } from "../../services/auth/auth.strategy";
import { JwtStrategy } from '../../services/auth/jws.strategy';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
