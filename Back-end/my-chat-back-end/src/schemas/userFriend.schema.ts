import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class userFriend {

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    friendname: string;
}

export const UserFriendSchema = SchemaFactory.createForClass(userFriend); 