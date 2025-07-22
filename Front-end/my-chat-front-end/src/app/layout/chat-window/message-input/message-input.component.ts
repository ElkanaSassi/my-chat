import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Socket } from 'socket.io-client';

import { HttpService } from '../../../core/services/http/httpConnection.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';
import { ChatSelectionService } from '../../chat-selection.service';

import { CreateMessageDto } from '../../../common/dto/messages/create-message.dto';
import { ChatRo } from '../../../common/ro/chats/chats.type';
import { UserInfoRo } from '../../../common/ro/users/userInfo.ro';
import { MessagesRo } from '../../../common/ro/messages/messages.ro';
import { WebSocketService } from '../../../core/services/websocket/websocket.service';

@Component({
    selector: 'app-message-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './message-input.component.html',
    styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
    messageText: string = '';
    currentChat: ChatRo;
    user: UserInfoRo;

    constructor(
        private httpService: HttpService,
        private localStorage: LocalStorageService,
        private webSocketService: WebSocketService,
        private chatSelectionService: ChatSelectionService,
    ) { }

    ngOnInit() {
        const u = this.localStorage.getItem('user');
        this.user = JSON.parse(u as string);

        this.chatSelectionService.getSelectedChat().subscribe(chat => {
            if (chat) {
                this.currentChat = chat;
                this.webSocketService.joinRoom(this.currentChat._id);
            }
        });

    }

    sendMessage() {

        if (this.messageText) {
            const completeMessage: CreateMessageDto = {
                from: this.user.username,
                data: this.messageText,
            }

            const path = this.currentChat.chatType === 'DmRo'
                ? this.webSocketService.sendDm({
                    room: this.currentChat._id, messageDto: completeMessage
                })
                : this.webSocketService.sendGroup({
                    room: this.currentChat._id, messageDto: completeMessage
                });;
            this.messageText = '';
        }
    }


}
