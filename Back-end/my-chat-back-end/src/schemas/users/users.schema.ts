import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


@Schema()
export class Users extends Document {

    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: Date, required: true })
    singupData: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Users' }], default: [] })
    contacts: Users[];
}

export const UsersSchema = SchemaFactory.createForClass(Users); 