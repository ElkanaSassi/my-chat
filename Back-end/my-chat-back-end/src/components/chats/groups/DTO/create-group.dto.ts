import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroupDto {
    @IsNumber()
    @IsNotEmpty()
    groupId: number;

    @IsString()
    @IsNotEmpty()
    groupName: string;

    @IsString()
    @IsNotEmpty()
    openDate: Date;

    @IsString()
    @IsNotEmpty()
    groupManager: string;
    
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    usersList: string[];
}