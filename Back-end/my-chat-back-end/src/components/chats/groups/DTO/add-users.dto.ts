import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class AddOrRemoveUsersDto {
    
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    membersList: Types.ObjectId[];
}