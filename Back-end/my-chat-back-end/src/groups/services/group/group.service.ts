import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Groups } from 'src/schemas/groups/groups.schema';

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Groups.name) private usersModel: Model<Groups>
    ) {

    }
}
