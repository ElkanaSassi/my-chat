import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { UsersService } from '../../../users/services/user.service';
import { Dms } from 'src/schemas/chats/dms/dms.schema';
import { CreateDmDto } from '../../../../dtos/dms/create-dm.dto';
import { Chats } from 'src/schemas/chats/chats.schema';

@Injectable()
export class DmsService {
    private dmsModel: Model<Dms>;

    constructor(
        private usersServices: UsersService,
        @InjectModel(Chats.name) private readonly chatsModel: Model<Chats>,
    ) {
        const dmsModel = this.chatsModel.discriminators?.Dms;

        this.dmsModel = dmsModel as Model<Dms>;
    }

    async createDm(createDmDto: CreateDmDto) {
        if (createDmDto.membersList.length != 2) throw new NotAcceptableException('Members Error: the amount of members aren\'t two.');
        const userOne = await this.usersServices.getUserById(createDmDto.membersList[0]);
        const userTwo = await this.usersServices.getUserById(createDmDto.membersList[1]);

        const dmComplete = {
            membersList: [userOne, userTwo],
            chatType: Dms.name,
        }

        const newDm = new this.dmsModel(dmComplete);
        return await newDm.save();
    }

    async getUserDms(username: string) {
        const user = await this.usersServices.getUserByUserName(username);

        const userDms = await this.dmsModel.find({
            membersList: {
                $in: [
                    user._id,
                ]
            }
        });
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
    async deleteUserDm(userId: Types.ObjectId, dmId: Types.ObjectId) {
        const user = await this.usersServices.getUserById(userId);
        // add validation
        const userOldDm = await this.dmsModel.findById(dmId);
        if (!userOldDm) throw new NotFoundException(`Invalid DM id: Couldn't find DM is : ${dmId}.`);

        const newMembersList = userOldDm.membersList.splice(userOldDm.membersList.indexOf(userId, 0));
        const userNewDm = await this.dmsModel.findByIdAndUpdate(dmId, { membersList: newMembersList });

        return userNewDm;
    }


}
