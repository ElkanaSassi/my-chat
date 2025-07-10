import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Users } from "../users/users.schema";


@Schema()
export class Groups {

    @Prop({ unique: true, required: true })
    groupId: number;

    @Prop({ type: Date, required: true })
    groupName: string;

    @Prop({type: Types.ObjectId , ref: 'Users'})
    admin: Users;

    @Prop({ type: Date, required: true })
    openDate: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Users' }], default: [] })
    membersList: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Users' }], default: [] })
    messages: Types.ObjectId[];
}

export const groupsSchema = SchemaFactory.createForClass(Groups); 