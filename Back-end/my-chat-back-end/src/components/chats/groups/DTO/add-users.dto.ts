import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddAndRemoveUsersDto {
    @IsNumber()
    @IsNotEmpty()
    groupId: number;
    
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    usersList: string[];
}