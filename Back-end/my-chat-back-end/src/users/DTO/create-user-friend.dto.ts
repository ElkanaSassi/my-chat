import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserFriendDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    friendUsername: string;
}