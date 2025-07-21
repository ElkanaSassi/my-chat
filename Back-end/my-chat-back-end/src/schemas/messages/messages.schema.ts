import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Users } from "../users/users.schema";

@Schema({ _id: false })
export class Messages {

    @Prop({ type: String, required: true })
    from: string;

    @Prop({ type: Date, default: Date.now })
    dateTime: Date;

    @Prop({ type: String, required: true })
    data: string;

    // TODO: maybe add a IsUpdated Boolean
}

export const messagesSchema = SchemaFactory.createForClass(Messages);