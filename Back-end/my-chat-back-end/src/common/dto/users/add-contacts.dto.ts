import { IsNotEmpty, IsString } from "class-validator";

export class AddContactsDto {

    @IsString()
    @IsNotEmpty()
    contact: string;
}