import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Messages } from 'src/schemas/messages/messages.schema';
import { CreateMessageDto } from '../DTO/create-message.dto';
import { UsersService } from 'src/components/users/services/user/user.service';
import { Users } from 'src/schemas/users/users.schema';

@Injectable()
export class MessagesServices {
    constructor(
        private usersServices: UsersService,
        @InjectModel(Messages.name) private messagesModel: Model<Messages>,
        @InjectModel(Users.name) private usersModel: Model<Users>,
    ) { }

    async createMessage(createMessageDto: CreateMessageDto) {
        const { from, data } = createMessageDto;
        const user = await this.usersServices.getUserById(from);
        
        const messageComplete = {
            from: from,
            timeDate: new Date(),
            data: data,
        }

        const newMessage = await new this.messagesModel(messageComplete);
        return await newMessage.save();
    }

}
