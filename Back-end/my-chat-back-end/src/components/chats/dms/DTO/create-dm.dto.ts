import { ArrayUnique, IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDmDto {

    @IsNumber()
    @IsNotEmpty()
    dmsId: number;

    @IsDate()
    @IsNotEmpty()
    openDate: Date;

    @IsString()
    @IsNotEmpty()
    userOne: string;

    @IsString()
    @IsNotEmpty()
    userTwo: string;

    @IsArray()
    @IsMongoId({ each: true })
    @ArrayUnique()
    @IsNotEmpty()
    messages: Types.ObjectId[];
}