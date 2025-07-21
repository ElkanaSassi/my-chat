import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from '../../../users/services/user.service';
import { Dms } from 'src/schemas/chats/dms/dms.schema';
import { CreateDmDto } from '../../../../common/dto/dms/create-dm.dto';
import { Chats } from 'src/schemas/chats/chats.schema';
import { difference } from 'lodash';
import { Messages } from 'src/schemas/messages/messages.schema';
import { CreateMessageDto } from '../../../../common/dto/messages/create-message.dto';
import { DmRo } from 'src/common/ro/dms/dms.ro';
import { MessagesRo } from 'src/common/ro/messages/messages.ro';

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

    public async createMessage(dmId: Types.ObjectId, createMessageDto: CreateMessageDto): Promise<Messages> {
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

        return completeMessage;
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
