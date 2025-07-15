import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMessageDto } from './messages/DTO/create-message.dto';
import { MessagesServices } from './messages/services/messages.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatsGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly messagesService: MessagesServices) {}

  @SubscribeMessage('send_message')
  @UsePipes(new ValidationPipe())
  async handleMessage(@MessageBody() data: CreateMessageDto, @ConnectedSocket() client: Socket ) {
    const message = await this.messagesService.createMessage(data);

    this.server.emit('new_message', message);
  }
}
