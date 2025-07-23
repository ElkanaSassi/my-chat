import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

import { CreateMessageDto } from '../../../common/models/dto/messages/create-message.dto';
import { MessagesRo } from 'src/common/models/ro/messages/messages.ro';
import { GroupService } from './services/group.service';
import { Groups } from 'src/schemas/chats/groups/groups.schema';

@WebSocketGateway({
    port: 3000,
    namespace: Groups.name,
    cors: {
        origin: 'http://localhost:4200',
    },
})
export class GroupsGateway {
    @WebSocketServer() server: Server;

    constructor(private groupService: GroupService) { }

    @SubscribeMessage('joinGroup')
    handleJoinGroup(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
        console.log('roomId: ', room);
        client.join(room);
    }

    @SubscribeMessage('sendGroupMessage')
    public async handleSendGroup(@MessageBody() payload: { room: string, messageDto: CreateMessageDto }, @ConnectedSocket() client: Socket)
        : Promise<MessagesRo> {
        console.log('in sendDm. payload: roomId:', payload.room, 'Dto', payload.messageDto);

        const savedMessage = await this.groupService.createMessage(new Types.ObjectId(payload.room), payload.messageDto);
        if (!savedMessage) throw new BadRequestException('Failed: Couldn\'t create message.');

        console.log('save message: ', savedMessage);

        this.server.to(payload.room).emit('newDm', savedMessage);

        return savedMessage;
    }
}
