import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/components/users/services/user/user.service';
import { Dms } from 'src/schemas/dms/dms.schema';
import { Users } from 'src/schemas/users/users.schema';
import { CreateDmDto } from '../DTO/create-dm.dto';

@Injectable()
export class DmsService {
    constructor(
        private usersServices: UsersService,
        @InjectModel(Dms.name) private dmsModel: Model<Users>,
    ) {

    }

    async createDm(createDmDto: CreateDmDto) {
        const userOne = await this.usersServices.getUserByUserName(createDmDto.userOne);
        const userTwo = await this.usersServices.getUserByUserName(createDmDto.userTwo);

        const dmComplete = {
            dmsId: createDmDto.dmsId,
            openDate: new Date(),
            userOne: createDmDto.userOne,
            userTwo: createDmDto.userTwo,
        }

        const newDm = await new this.dmsModel(dmComplete);
        return newDm.save();
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

    async getDmMessages(dmId: Types.ObjectId) {
        const dm = await this.dmsModel.findById(dmId)
            .populate('messages')
            .exec();

        if (!dm) throw new NotFoundException(`Group with ID ${dmId} not found.`);

        return dm;
    }

    // Note: maybe make that when user deletes the dm, it will affect only in is cline side. 
    // (so the other user could stil look at the chat)
    async deleteUserDm(username: string, dmId: Types.ObjectId) {
        const user = await this.usersServices.getUserByUserName(username);

        const userDm = await this.dmsModel.findByIdAndDelete(dmId);
        if (!userDm) throw new NotFoundException(`Invalid DM id: Couldn't find DM is : ${dmId}.`);

        return userDm;
    }


}
