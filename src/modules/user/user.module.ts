import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { userSchema, User } from '../../schemas/user.schema';
import { UserService } from '../../services/user/user.service';
import { UserController } from '../../controllers/user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../../decorators/role.decorator';
import { AuthService } from "../../services/auth/auth.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService, {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
