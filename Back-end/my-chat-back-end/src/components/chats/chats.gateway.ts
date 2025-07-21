import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMessageDto } from '../../common/dto/messages/create-message.dto';
import { MessagesServices } from './messages/services/messages.service';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() 
  server: Server;

  constructor(private readonly messagesService: MessagesServices) { }

  handleConnection() { }
  handleDisconnect() { }
  
  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: CreateMessageDto, @ConnectedSocket() client: Socket) {
    const message = await this.messagesService.createMessage(data);

    this.server.emit('newMessage', message);
  }
}
