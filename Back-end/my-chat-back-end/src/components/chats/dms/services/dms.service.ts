import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { difference } from 'lodash';

import { UsersService } from '../../../users/services/user.service';

import { CreateMessageDto } from '../../../../common/models/dto/messages/create-message.dto';
import { CreateDmDto } from '../../../../common/models/dto/dms/create-dm.dto';
import { MessagesRo } from 'src/common/models/ro/messages/messages.ro';
import { DmRo } from 'src/common/models/ro/dms/dms.ro';

import { Messages } from 'src/schemas/messages/messages.schema';
import { Dms } from 'src/schemas/chats/dms/dms.schema';
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

    public async createDm(createDmDto: CreateDmDto): Promise<DmRo> {
        if (createDmDto.membersList.length != 2) {
            throw new NotAcceptableException('Members Error: the amount of members aren\'t two.');
        }

        const userOne = await this.usersServices.getUserByUserName(createDmDto.membersList[0]);
        const userTwo = await this.usersServices.getUserByUserName(createDmDto.membersList[1]);

        const dmComplete = {
            membersList: [userOne._id, userTwo._id],
            chatType: Dms.name,
        }
        const newDm = new this.dmsModel(dmComplete);
        await newDm.save();

        return this.buildDmRo(newDm);
    }

    public async getDm(dmId: Types.ObjectId): Promise<DmRo> {
        const dm = await this.dmsModel.findById(dmId).exec();

        if (!dm) {
            throw new NotFoundException(`Failed: Couldn't find dm: ${dmId}`);
        }

        return this.buildDmRo(dm);
    }

    public async getUserDms(username: string): Promise<DmRo[]> {
        const user = await this.usersServices.getUserByUserName(username);

        const userDms = await this.dmsModel.find({
            membersList: { $in: [user._id] }
        });

        if (userDms.length === 0) {
            throw new NotFoundException(`Failed: Couldn't find DMs of user: ${user.username}.`);
        }

        return Promise.all(userDms.map(async dm => await this.buildDmRo(dm)));
    }

    public async createMessage(dmId: Types.ObjectId, createMessageDto: CreateMessageDto): Promise<MessagesRo> {
        const dm = await this.dmsModel.findById(dmId).exec();
        if (!dm) {
            throw new NotFoundException(`Failed: Couldn't find DM with Id: ${dmId}`);
        }

        const completeMessage: Messages = {
            from: createMessageDto.from,
            dateTime: new Date(),
            data: createMessageDto.data,
        }

        dm.messages.push(completeMessage);
        await dm.save();

        const messagesRo: MessagesRo = {
            messagesList: dm.messages
        }

        return messagesRo;
    }

    public async getDmMessages(dmId: Types.ObjectId): Promise<MessagesRo> {
        const dm = await this.dmsModel.findById(dmId).exec();
        if (!dm) {
            throw new NotFoundException(`Faild: Couldn't find messages of DM: ${dmId}.`);
        }
        const messagesToReturn: MessagesRo = {
            messagesList: dm.messages
        } 
        return messagesToReturn;
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

    private async buildDmRo(dm: Dms & { _id: Types.ObjectId; }): Promise<DmRo> {
        const usernames = await Promise.all(
            dm.membersList.map(
                async (m) => (await this.usersServices.getUserById(m)).username
            )
        );

        const dmToReturn: DmRo = {
            _id: dm._id.toString(),
            chatType: DmRo.name,
            membersList: usernames,
            messages: dm.messages,
            createAt: dm.createAt
        }
        return dmToReturn;
    }


}
