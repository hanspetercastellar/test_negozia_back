import { CreateDto, UpdateUserDto } from "./userDto";
import { UserService } from '../../services/user/user.service';
import { Controller, Post, Body, Response, Request, Patch, Get, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Role } from "../../enums/roles.enum";
import { Roles, RolesGuard } from "../../decorators/role.decorator";
import * as bcrypt from "bcrypt";
import { LocalAuthGuard } from "../../services/auth/local.auth.guard";
import { JwtAuthGuard } from "../../services/auth/jwt-auth.guard";

@ApiTags("Users")
@Controller("/user")
export class UserController {

  constructor(private readonly _service: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Get()
  public async findAll(@Response() res) {
    const users = await this._service.findAll();
    return res.status(200).json(users);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
 // @Roles(Role.Admin)
  public async create(@Response() res, @Body() createDto: CreateDto) {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createDto.password,
        saltOrRounds,
      );
      const userCreated = await this._service.create({
        ...createDto,
        password: hashedPassword,
      });
      return res.status(200).json(userCreated);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  public async update(@Response() res, @Body() updateUserDto: UpdateUserDto, @Param("id") userId: string) {
    const userCreated = await this._service.update(userId, updateUserDto);
    return res.status(200).json(userCreated);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  public async delete(@Response() res, @Param("id") userId: string) {
    const userCreated = await this._service.delete(userId);
    return res.status(200).json(userCreated);
  }


}
