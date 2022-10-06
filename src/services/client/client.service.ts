import { Injectable, NotFoundException } from "@nestjs/common";
import { CrudInterface } from "../../controllers/interfaces/crud.interface";
import { ClientDto, UpdateClientDto } from "../../controllers/client/client.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Client } from "../../schemas/client.schema";
import { Model } from "mongoose";

@Injectable()
export class ClientService implements CrudInterface{

  constructor(@InjectModel(Client.name) private readonly clientModel: Model<Client>) {}

  async create(client: ClientDto): Promise<any> {
    const createdClient = await new this.clientModel(client);
    return createdClient.save()
  }

  async delete(id: string): Promise<any> {
    const deletedClient = await this.clientModel.deleteOne({ id: id });
    if (!deletedClient) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return deletedClient;
  }

  async list(): Promise<any> {
    const clients = await this.clientModel.find().exec();
    if (!clients || clients.length === 0) {
      throw new NotFoundException(`Clients not found`);
    }
    return clients;
  }

  async update(id: string, data: UpdateClientDto): Promise<any> {
    const client = await this.clientModel.updateOne({ id: id }, data);
    return client;
  }




}