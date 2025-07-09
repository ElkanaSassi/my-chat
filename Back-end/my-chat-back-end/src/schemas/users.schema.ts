import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Users {

    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ type: Date, required: true })
    singupData: Date;

    @Prop({type: Date, required: false})
    birthDate?: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users); 