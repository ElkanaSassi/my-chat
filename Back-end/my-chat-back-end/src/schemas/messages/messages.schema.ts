import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Users } from "../users/users.schema";

@Schema({ _id: false })
export class Messages {

    @Prop({  type: Types.ObjectId, ref: 'Users', required: true })
    from: Users;

    @Prop({ type: Date, default: Date.now })
    dateTime: Date;

    @Prop({ type: String, required: true })
    data: string;

    // TODO: maybe add a IsUpdated Boolean
}

export const messagesSchema = SchemaFactory.createForClass(Messages);