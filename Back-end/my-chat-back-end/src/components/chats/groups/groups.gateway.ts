import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesServices } from '../messages/services/messages.service';
import { GroupService } from './services/group.service';
import { CreateMessageDto } from '../messages/DTO/create-message.dto';
import { UsePipes, ValidationPipe, Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class GroupsGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly messagesService: MessagesServices,
        private readonly groupService: GroupService,
    ) { }

    @SubscribeMessage('send_group_message')
    @UsePipes(new ValidationPipe())
    async handleGroupMessage(@MessageBody() messageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
        // const savedMessage = await this.messagesService.createMessage(messageDto);

        // const room = messageDto.chatId;
        // client.join(room);
        // this.server.to(room).emit('new_group_message', savedMessage);
    }
}
