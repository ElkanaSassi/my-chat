import { ArrayUnique, IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDmDto {

    @IsNumber()
    @IsNotEmpty()
    dmsId: number;

    @IsString()
    @IsNotEmpty()
    userOne: string;

    @IsString()
    @IsNotEmpty()
    userTwo: string;

}