import { IsArray, IsMongoId, IsNotEmpty, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDmDto {
    @IsArray()
    @IsMongoId({ each: true })
    @Length(2, 2)
    @IsNotEmpty()
    membersList: Types.ObjectId[];

}