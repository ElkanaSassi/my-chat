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
    socket: Socket;

    constructor(
        private httpService: HttpService,
        private localStorage: LocalStorageService,
        private chatSelectionService: ChatSelectionService,
    ) { }

    ngOnInit() {
        const u = this.localStorage.getItem('user');
        this.user = JSON.parse(u as string);

        this.chatSelectionService.getSelectedChat().subscribe(chat => {
            if (chat) {
                this.currentChat = chat;
            }
        });

    }

    sendMessage() {
        const path = this.currentChat.chatType === 'DmRo'
            ? `dms/messages/${this.currentChat._id}`
            : `groups/messages/${this.currentChat._id}`;

        if (this.messageText) {
            const completeMessage: CreateMessageDto = {
                from: this.user.username,
                data: this.messageText,
            }
            //this.socket.emit('sendDm', completeMessage);
            this.httpService.post<MessagesRo>(path, completeMessage).subscribe();
            this.messageText = '';
        }
    }


}
