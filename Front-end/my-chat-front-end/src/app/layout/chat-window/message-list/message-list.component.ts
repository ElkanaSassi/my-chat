import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../../core/services/http/httpConnection.service';
import { ChatSelectionService } from '../../chat-selection.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';
import { MessagesRo } from '../../../common/ro/messages/messages.ro';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { WebSocketService } from '../../../core/services/websocket/websocket.service';
import { ChatRo } from '../../../common/ro/chats/chats.type';

@Component({
    selector: 'app-message-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message-list.component.html',
    styleUrl: './message-list.component.css'
})
export class MessageListComponent {
    messages: MessagesRo;
    username: string;
    currentChat: ChatRo;

    constructor(
        private httpService: HttpService,
        private localStorage: LocalStorageService,
        private websocketService: WebSocketService,
        private chatSelectionService: ChatSelectionService,
    ) { }

    ngOnInit() {
        const u = this.localStorage.getItem('user');
        this.username = JSON.parse(u as string).username;

        this.chatSelectionService.getSelectedChat().subscribe(chat => {
            if (chat) {
                this.currentChat = chat;
                this.loadChat(chat);
            }
        });


    }

    loadChat(chat: ChatRo) {
        if (chat.chatType === 'DmRo') {
            this.httpService.get<MessagesRo>(`dms/messages/${chat._id}`).subscribe({
                next: (res) => {
                    this.messages = res;
                },
                error: (err) => { }
            });

            this.websocketService.getDm().subscribe({
                next: (res) => {
                    this.messages = res;
                }
            });
        }
        else if (chat.chatType === 'GroupRo') {
            this.httpService.get<MessagesRo>(`groups/messages/${chat._id}`).subscribe({
                next: (res) => {
                    this.messages = res;
                },
                error: (err) => { }
            });

            this.websocketService.getGroup().subscribe({
                next: (res) => {
                    this.messages = res;
                }
            });
        }

    }

}
