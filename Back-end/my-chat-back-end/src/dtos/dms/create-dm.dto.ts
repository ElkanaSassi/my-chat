import { ArrayUnique, IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDmDto {
    @IsArray()
    @IsMongoId({ each: true })
    @Length(2,2)
    @IsNotEmpty()
    membersList: Types.ObjectId[];

}