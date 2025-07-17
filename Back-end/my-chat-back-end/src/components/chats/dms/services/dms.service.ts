import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { UsersService } from '../../../users/services/user.service';
import { Dms } from 'src/schemas/chats/dms/dms.schema';
import { CreateDmDto } from '../../../../dtos/dms/create-dm.dto';
import { Chats } from 'src/schemas/chats/chats.schema';
import { difference } from 'lodash';

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

    public async createDm(createDmDto: CreateDmDto): Promise<Dms> {
        if (createDmDto.membersList.length != 2) {
            throw new NotAcceptableException('Members Error: the amount of members aren\'t two.');
        }

        const userOne = await this.usersServices.getUserById(createDmDto.membersList[0]);
        const userTwo = await this.usersServices.getUserById(createDmDto.membersList[1]);

        const dmComplete = {
            membersList: [userOne, userTwo],
            chatType: Dms.name,
        }

        const newDm = new this.dmsModel(dmComplete);
        return newDm.save();
    }

    public async getUserDms(username: string): Promise<Dms[]> {
        const user = await this.usersServices.getUserByUserName(username);

        const userDms = await this.dmsModel.find({
            membersList: { $in: [user._id] }
        });

        if (userDms.length === 0) {
            throw new NotFoundException(`Failed: Couldn't find DMs of user: ${user.username}.`);
        }

        return userDms;
    }

    public async getDmMessages(dmId: Types.ObjectId): Promise<Dms> {
        const dm = await this.dmsModel.findById(dmId)
            .populate('messages')
            .exec();

        if (!dm) throw new NotFoundException(`Faild: Couldn't find messages of DM: ${dmId}.`);

        return dm;
    }

    // Note: maybe make that when user deletes the dm, it will affect only in is cline side. 
    // (so the other user could stil look at the chat)
    public async deleteUserDm(userId: Types.ObjectId, dmId: Types.ObjectId): Promise<Dms> {
        const user = await this.usersServices.getUserById(userId);
        // add validation
        const userOldDm = await this.dmsModel.findById(dmId);
        if (!userOldDm) {
            throw new NotFoundException(`Invalid DM id: Couldn't find DM is: ${dmId}.`);
        }

        // difference returns the membersList without the user deleting.
        userOldDm.membersList = difference(userOldDm.membersList, userId);

        return userOldDm.save();
    }


}
