import { IsDate, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateMessageDto {

    @IsMongoId({ each: true })
    @IsNotEmpty()
    from: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    data: string;
}