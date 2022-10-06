import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest'), UserModule, AuthModule, ClientModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
