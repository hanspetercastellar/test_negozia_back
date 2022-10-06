import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "../../services/auth/auth.service";
import { LocalAuthGuard } from "../../services/auth/local.auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

  constructor(private readonly _authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    return  await this._authService.login(req.user);
  }

}
