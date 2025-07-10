import { ArrayUnique, IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroupDto {
    @IsNumber()
    @IsNotEmpty()
    groupId: number;

    @IsString()
    @IsNotEmpty()
    groupName: string;

    @IsDate()
    @IsNotEmpty()
    openDate: Date;

    @IsString()
    @IsNotEmpty()
    admin: string;

    @IsArray()
    @IsMongoId({ each: true })
    @ArrayUnique()
    @IsNotEmpty()
    membersList: string[];

    @IsArray()
    @IsMongoId({ each: true })
    @ArrayUnique()
    @IsNotEmpty()
    messages: string[];
}