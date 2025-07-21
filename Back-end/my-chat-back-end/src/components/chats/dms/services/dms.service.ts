import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { UsersService } from '../../../users/services/user.service';
import { Dms } from 'src/schemas/chats/dms/dms.schema';
import { CreateDmDto } from '../../../../dtos/dms/create-dm.dto';
import { Chats } from 'src/schemas/chats/chats.schema';
import { difference } from 'lodash';
import { Messages } from 'src/schemas/messages/messages.schema';
import { CreateMessageDto } from 'src/dtos/messages/create-message.dto';

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

    public async getUserDms(userId: Types.ObjectId): Promise<Dms[]> {
        const user = await this.usersServices.getUserById(userId);

        const userDms = await this.dmsModel.find({
            //membersList: { $in: [user._id] }
        });

        if (userDms.length === 0) {
            throw new NotFoundException(`Failed: Couldn't find DMs of user: ${user.username}.`);
        }

        return userDms;
    }

    public async createMessage(dmId: Types.ObjectId, createMessageDto: CreateMessageDto) {
        const dm = await this.dmsModel.findById(dmId).exec();

        const completeMessage: Messages = {
            from: createMessageDto.from,
            dateTime: new Date(),
            data: createMessageDto.data,
        }

        dm?.messages.push(completeMessage);
        await dm?.save();
        return dm?.messages;
    }

    public async getDmMessages(dmId: Types.ObjectId): Promise<Messages[]> {
        // const dm = await this.dmsModel.findById(dmId)
        //     .populate('messages')
        //     .exec();
        const dm = await this.dmsModel.findById(dmId).exec();

        if (!dm) throw new NotFoundException(`Faild: Couldn't find messages of DM: ${dmId}.`);

        for (let msg of dm?.messages) {
            const user = await this.usersServices.getUserById(new Types.ObjectId(msg.from));
            msg.from = user.username;
        }

        return dm?.messages;
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
