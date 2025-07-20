import { ArrayUnique, IsArray, IsDate, IsEmpty, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
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
    @IsOptional()
    description?: string;
}