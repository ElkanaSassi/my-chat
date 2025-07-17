import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Chats } from "../chats.schema";
import { Users } from "src/schemas/users/users.schema";


@Schema()
export class Groups extends Chats {
    @Prop({ required: true })
    groupName: string;

    @Prop({ type: Types.ObjectId, ref: 'Users' })
    admin: Users;

    @Prop()
    description: string;
}

export const GroupsSchema = SchemaFactory.createForClass(Groups); 