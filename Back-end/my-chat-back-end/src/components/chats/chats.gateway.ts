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

import { DmsService } from './dms/services/dms.service';
import { GroupService } from './groups/services/group.service';

import { CreateMessageDto } from '../../common/models/dto/messages/create-message.dto';
import { MessagesRo } from 'src/common/models/ro/messages/messages.ro';


@WebSocketGateway({
    port: 3001,
    cors: {
        origin: ['http://localhost:4200', '*'],
    },
})
export class ChatsGateway {
    @WebSocketServer() server: Server;

    constructor(
        private dmsService: DmsService,
        private groupService: GroupService,
    ) { }

    @SubscribeMessage('joinDm')
    handleJoinDm(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
        console.log('roomId: ', room);
        client.join(room);
    }

    @SubscribeMessage('sendDm')
    public async handleSendDm(@MessageBody() payload: { room: string, messageDto: CreateMessageDto }, @ConnectedSocket() client: Socket)
        : Promise<MessagesRo> {
        console.log('in sendDm. payload: roomId:', payload.room, 'Dto', payload.messageDto);

        const savedMessage = await this.dmsService.createMessage(new Types.ObjectId(payload.room), payload.messageDto);
        if (!savedMessage) throw new BadRequestException('Failed: Couldn\'t create message.');

        console.log('save message: ', savedMessage);

        this.server.to(payload.room).emit('newDm', savedMessage);

        return savedMessage;
    }

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
