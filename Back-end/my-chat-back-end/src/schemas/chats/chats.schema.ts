import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { model, Types } from "mongoose";

const options = {
    discriminatorKey: 'chatType',
};

@Schema(options)
export class Chats {
    @Prop({ default: Date.now })
    createAt: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Users' }], default: [] })
    membersList: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Messages' }], default: [] })
    messages: Types.ObjectId[];
}

export const ChatsSchema = SchemaFactory.createForClass(Chats);