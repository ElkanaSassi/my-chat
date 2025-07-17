import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    password: string;
    
    @IsString()
    birthDate?: Date;
}