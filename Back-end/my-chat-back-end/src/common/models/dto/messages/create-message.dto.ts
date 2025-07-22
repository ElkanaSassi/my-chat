import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    from: string;

    @IsNotEmpty()
    @IsString()
    data: string;
}