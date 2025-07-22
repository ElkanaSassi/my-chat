import { ArrayMaxSize, IsArray, IsMongoId, IsNotEmpty, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDmDto {
    @IsArray()
    @ArrayMaxSize(2)
    @IsNotEmpty()
    membersList: string[];

}