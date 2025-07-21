import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../../core/services/http/httpConnection.service';
import { ChatSelectionService } from '../../chat-selection.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';
import { Message } from '../../../shared/types/message.type';

@Component({
    selector: 'app-message-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message-list.component.html',
    styleUrl: './message-list.component.css'
})
export class MessageListComponent {
    messages: Message[];
    username: string;
    currentChatId: string;

    constructor(
        private httpService: HttpService,
        private localStorage: LocalStorageService,
        private chatSelectionService: ChatSelectionService,
    ) { }

    ngOnInit() {
        const u = this.localStorage.getItem('user');
        this.username = JSON.parse(u as string).username;

        this.chatSelectionService.getSelectedChat().subscribe(chat => {
            if (chat) {
                this.currentChatId = chat._id;
                this.loadChat(chat._id);
            }
        });
    }

    loadChat(chatId: string) {
        console.log('in loadChat method within messagesListComponent. chatId:', chatId);
        this.httpService.get<Message[]>(`dms/messages/${chatId}`).subscribe({
            next: (res) => {
                console.log(res);
                this.messages = res;
            },
            error: (err) => { }
        });
    }
}
