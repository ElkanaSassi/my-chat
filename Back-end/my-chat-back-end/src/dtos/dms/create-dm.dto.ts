import { ArrayMaxSize, IsArray, IsMongoId, IsNotEmpty, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDmDto {
    @IsArray()
    @IsMongoId({ each: true })
    @ArrayMaxSize(2)
    @IsNotEmpty()
    membersList: Types.ObjectId[];

}