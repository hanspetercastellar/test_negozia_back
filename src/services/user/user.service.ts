import { CreateDto, UpdateUserDto } from "../../controllers/user/userDto";
import { User, UserDocument } from "../../schemas/user.schema";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async create(createDto: CreateDto): Promise<User> {
    const exists = await this.userModel.findOne({ email: createDto.email });
    if (exists) {
      console.log('User already exists');
      throw new NotFoundException(`User already exists`);
    }
    const createUser = new this.userModel(createDto);
    return createUser.save();
  }

  async update(id: string, updateDto: UpdateUserDto) {
    const user = await this.userModel.updateOne({ id: id }, updateDto);
    return user;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel.deleteOne({ id: id });
    if (!deletedUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return deletedUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    if (!users || users.length === 0) {
      throw new NotFoundException(`Users not found`);
    }
    return users;
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }
}
