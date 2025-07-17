import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesServices } from '../messages/services/messages.service';
import { DmsService } from './services/dms.service';
import { CreateMessageDto } from '../../../dtos/messages/create-message.dto';
import { UsePipes, ValidationPipe, Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class DmsGateway {
    @WebSocketServer() server: Server;

    constructor(
        private readonly messagesService: MessagesServices,
        private readonly dmsService: DmsService,
    ) { }

    @SubscribeMessage('send_dm')
    @UsePipes(new ValidationPipe())
    async handleSendDm(@MessageBody() messageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
        // const savedMessage = await this.messagesService.createMessage(messageDto);

        // const room = savedMessage._id.toString();
        // client.join(room);
        // this.server.to(room).emit('new_dm', savedMessage);
    }


}
