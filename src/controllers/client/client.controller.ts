import { Body, Controller, Delete, Get, Patch, Post, Query, Response, UseGuards } from "@nestjs/common";
import { ClientService } from "../../services/client/client.service";
import { ApiTags } from "@nestjs/swagger";
import { ClientDto, UpdateClientDto } from "./client.dto";
import { JwtAuthGuard } from "../../services/auth/jwt-auth.guard";
import { Roles, RolesGuard } from "../../decorators/role.decorator";
import { Role } from "../../enums/roles.enum";

@ApiTags("Client")
@Controller("clients")
export class ClientController {

  constructor(private readonly _clientService: ClientService) {
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(@Response() res): Promise<any> {
    const clients = await this._clientService.list();
    return res.status(200).json(clients);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Response() res, @Body() createDto: ClientDto): Promise<any> {
    const clientCreated = await this._clientService.create(createDto);
    return res.status(200).json(clientCreated);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("/:id")
  async update(@Response() res, @Body() updateDto: UpdateClientDto, @Query() options): Promise<any> {
    const clientUpdated = await this._clientService.update(options.id, updateDto);
    return res.status(200).json(clientUpdated);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async delete(@Response() res, @Query() options): Promise<any> {
    const clientDeleted = await this._clientService.delete(options.id);
    return res.status(200).json(clientDeleted);
  }


}
