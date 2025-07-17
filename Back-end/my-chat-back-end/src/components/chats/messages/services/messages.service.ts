import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Messages } from 'src/schemas/messages/messages.schema';
import { CreateMessageDto } from '../../../../dtos/messages/create-message.dto';
import { UsersService } from 'src/components/users/services/user.service';
import { Users } from 'src/schemas/users/users.schema';
import { UpdateMessageDto } from '../../../../dtos/messages/update-message.dto';

@Injectable()
export class MessagesServices {
    constructor(
        private usersServices: UsersService
    ) { }

    async createMessage(createMessageDto: CreateMessageDto) {
        const { from, data } = createMessageDto;
        const user = await this.usersServices.getUserById(from);

        const messageComplete = {
            from: from,
            timeDate: new Date(),
            data: data,
        }

        //const newMessage = new this.messagesModel(messageComplete);
        //return await newMessage.save();
    }

    async deleteMessage(messageId: Types.ObjectId) {
        await this.checkMessageExistence(messageId);

        //return await this.messagesModel.findByIdAndDelete(messageId);
    }

    async updateMessage(messageId: Types.ObjectId, updateMessageDto: UpdateMessageDto) {
        await this.checkMessageExistence(messageId);

        const messageUpdateComplete = {
            timeDate: new Date(),
            data: updateMessageDto.data,
        }

        //return await this.messagesModel.findByIdAndUpdate(messageId, messageUpdateComplete, { new: true });
    }

    private async checkMessageExistence(messageId: Types.ObjectId) {
        //const message = await this.messagesModel.findById(messageId);
        //if (!message) throw new NotFoundException(`Invalid Message Id: Couldn't find message with id: ${messageId}`);

        //return message;
    }

}
