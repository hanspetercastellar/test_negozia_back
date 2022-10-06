import { Module } from '@nestjs/common';
import { ClientService } from "../../services/client/client.service";
import { ClientController } from "../../controllers/client/client.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Client, clientSchema } from "../../schemas/client.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: clientSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
