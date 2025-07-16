import { ArrayUnique, IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateGroupDto {
    @IsArray()
    @IsMongoId({ each: true })
    @IsNotEmpty()
    membersList: Types.ObjectId[];

    @IsString()
    @IsNotEmpty()
    groupName: string;

    @IsString()
    @IsNotEmpty()
    admin: string;

    @IsString()
    description: string;
}