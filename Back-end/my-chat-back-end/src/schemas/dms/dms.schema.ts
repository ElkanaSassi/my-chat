import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Users } from "../users/users.schema";


@Schema()
export class Dms {

    @Prop({ unique: true, required: true })
    dmsId: number;

    @Prop({ type: Date, required: true })
    openDate: Date;

    @Prop({ required: true })
    userOne: string;

    @Prop({ required: true })
    userTwo: string;

    @Prop({ required: false, type: [{ type: Types.ObjectId, ref: 'Users' }], default: [] })
    messages?: Types.ObjectId[];
}

export const dmsSchema = SchemaFactory.createForClass(Dms); 