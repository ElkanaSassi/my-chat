import { ArrayUnique, IsArray, IsDate, IsEmpty, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateGroupDto {
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    membersList: string[];

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