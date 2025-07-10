import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Users } from "../users/users.schema";


@Schema()
export class Messages {

    @Prop({ unique: true, type: [{ type: Types.ObjectId, ref: 'Users' }] })
    from: Users;

    @Prop({ type: Date, default: Date.now })
    dateTime: Date;

    @Prop({ type: String, required: true})
    date: string;
}

export const messagesSchema = SchemaFactory.createForClass(Messages); 