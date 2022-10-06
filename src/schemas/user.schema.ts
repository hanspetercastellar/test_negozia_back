import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from "./role.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    userName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    lastName: string;

    @Prop({ type: [{ type: String, ref: 'Role' }] })
    roles: Role[];

}

export const userSchema = SchemaFactory.createForClass(User);