import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesServices } from '../messages/services/messages.service';
import { DmsService } from './services/dms.service';
import { CreateMessageDto } from '../../../common/dto/messages/create-message.dto';
import { Types } from 'mongoose';
import { Messages } from 'src/schemas/messages/messages.schema';

@WebSocketGateway({ cors: { origin: '*' } })
export class DmsGateway implements OnGatewayConnection {
    @WebSocketServer() server: Server;

    constructor(
        private readonly dmsService: DmsService,
    ) { }

    handleConnection(socket: Socket) {
        const username = socket.handshake.auth?.username;
        
        socket.data.user = {
            _id: socket.id, // using socket ID as fake user ID
            username: username,
        };
    }

    @SubscribeMessage('joinDm')
    handleJoinDm(@MessageBody() chatId: string, @ConnectedSocket() client: Socket) {
        client.join(chatId);
    }

    @SubscribeMessage('sendDm')
    public async handleSendDm(@MessageBody() payload: { chatId: string, messageDto: CreateMessageDto }, @ConnectedSocket() client: Socket)
        : Promise<Messages> {
        const chatObjectId = new Types.ObjectId(payload.chatId);

        const savedMessage = await this.dmsService.createMessage(chatObjectId, payload.messageDto);

        const room = payload.chatId;
        client.join(room);
        this.server.to(room).emit('newDm', savedMessage);

        return savedMessage;
    }





}
