import { ArrayUnique, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class ContactsDto {

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsMongoId({ each: true })
    contacts: Types.ObjectId[];
}