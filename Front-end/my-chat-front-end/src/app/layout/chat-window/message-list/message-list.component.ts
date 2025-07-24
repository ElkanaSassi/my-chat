import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../../core/services/http/httpConnection.service';
import { ChatSelectionService } from '../../chat-selection.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';
import { MessagesRo } from '../../../common/ro/messages/messages.ro';
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
    @ViewChild('scrollMe') private scrollMeRef!: ElementRef;
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

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            const element = this.scrollMeRef.nativeElement;
            element.scrollTop = element.scrollHeight;
        } catch (err) {
            console.error("Error scrolling to bottom:", err);
        }
    }

    loadChat(chat: ChatRo) {
        if (chat.chatType === 'DmRo') {
            const path: string = `dms/messages/${chat._id}`;
            this.getMessages(path);

            this.websocketService.getDmMessages().subscribe({
                next: (res) => { this.messages = res; },
                error: (err) => { this.messages = { messagesList: [] }; }
            });
        }
        else if (chat.chatType === 'Groups') {
            const path: string = `groups/messages/${chat._id}`;
            this.getMessages(path);

            this.websocketService.getGroupMessages().subscribe({
                next: (res) => { this.messages = res; },
                error: (err) => { this.messages = { messagesList: [] }; }
            });
        }
    }

    getMessages(path: string): void {
        this.httpService.get<MessagesRo>(path).subscribe({
            next: (res) => {
                this.messages = res;
            },
            error: (err) => {
                this.messages = {
                    messagesList: []
                };
            }
        });
    }

}
