import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/components/users/services/user/user.service';
import { Dms } from 'src/schemas/dms/dms.schema';
import { Users } from 'src/schemas/users/users.schema';

@Injectable()
export class DmsService {
    constructor(
        private usersServices: UsersService,
        @InjectModel(Dms.name) private dmsModel: Model<Users>,
    ) {

    }

    async getUserDms(username: string) {
        const user = await this.usersServices.getUserByUserName(username);

        const userDms = await this.dmsModel.find({
            $or: [
                { userOne: user._id },
                { userTwo: user._id }
            ]
        }).exec();
        if (!userDms.length) throw new NotFoundException(`Failed: Couldn't find DMs of user: ${user.username}.`);

        return userDms;
    }

    async deleteUserDm(username: string, dmId: Types.ObjectId) {
        const user = await this.usersServices.getUserByUserName(username);

        const userDm = await this.dmsModel.findByIdAndDelete(dmId);
        if (!userDm) throw new NotFoundException(`Invalid DM id: Couldn't find DM is : ${dmId}.`);

        return userDm;
    }


}
