import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;


@Schema()
export class Client {
    @Prop()
    name: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;

    @Prop()
    city: string;

    @Prop()
    country: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const clientSchema = SchemaFactory.createForClass(Client);