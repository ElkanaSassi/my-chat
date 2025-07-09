import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Groups {

    @Prop({ unique: true, required: true })
    groupId: number;

    @Prop({ type: Date, required: true })
    groupName: string;

    @Prop({ type: Date, required: true })
    openDate: Date;
}

export const groupsSchema = SchemaFactory.createForClass(Groups); 