import { IsDate, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    from: string;

    @IsNotEmpty()
    @IsString()
    data: string;
}