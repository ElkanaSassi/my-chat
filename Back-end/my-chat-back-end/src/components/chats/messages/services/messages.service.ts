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

    public async createMessage(createMessageDto: CreateMessageDto)
    // : Promise<Messages> 
    {
        const { from, data } = createMessageDto;
        const user = await this.usersServices.getUserByUserName(from);

        const messageComplete = {
            from: user._id,
            timeDate: new Date(),
            data: data,
        }

        //const newMessage = new this.messagesModel(messageComplete);
        //return await newMessage.save();
    }

    public async deleteMessage(messageId: Types.ObjectId)
    // : Promise<Messages> 
    {
        await this.checkMessageExistence(messageId);

        //return await this.messagesModel.findByIdAndDelete(messageId);
    }

    public async updateMessage(messageId: Types.ObjectId, updateMessageDto: UpdateMessageDto)
    // : Promise<Messages> 
    {
        await this.checkMessageExistence(messageId);

        const messageUpdateComplete = {
            timeDate: new Date(),
            data: updateMessageDto.data,
        }

        //return await this.messagesModel.findByIdAndUpdate(messageId, messageUpdateComplete, { new: true });
    }

    private async checkMessageExistence(messageId: Types.ObjectId)
    // : Promise<Messages> 
    {
        //const message = await this.messagesModel.findById(messageId);
        //if (!message) throw new NotFoundException(`Invalid Message Id: Couldn't find message with id: ${messageId}`);

        //return message;
    }

}
