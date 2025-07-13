import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Chats } from "../chats.schema";


@Schema()
export class Dms extends Chats {

}

export const DmsSchema = SchemaFactory.createForClass(Dms); 