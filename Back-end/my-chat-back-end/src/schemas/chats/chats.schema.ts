import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { model, Types } from "mongoose";
import { Messages } from "../messages/messages.schema";
import { Users } from "../users/users.schema";

const options: SchemaOptions = {
    discriminatorKey: 'chatType',
    _id: false
};

@Schema(options)
export class Chats {
    @Prop({ default: Date.now })
    createAt: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Users' }], default: [] })
    membersList: Types.ObjectId[];

    @Prop({ type: [Messages], default: [] })
    messages: Messages[];
}

export const ChatsSchema = SchemaFactory.createForClass(Chats);