import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../../core/services/http/httpConnection.service';
import { ChatSelectionService } from '../../chat-selection.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';

export interface Message {
    from: string;
    dateTime: Date;
    data: string;
}

@Component({
    selector: 'app-message-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message-list.component.html',
    styleUrl: './message-list.component.css'
})
export class MessageListComponent {
    messages: Message[];
    selectedChatId: string;
    userId: string;
    private sub: Subscription;
    currentChatId: string | null = null;

    constructor(
        private httpService: HttpService,
        private chatSelectionService: ChatSelectionService,
        private localStorage: LocalStorageService,
    ) { }

    ngOnInit() {
        const u = this.localStorage.getItem('user');
        this.userId = JSON.parse(u as string)._id;

        this.sub = this.chatSelectionService.getSelectedChat().subscribe(chatId => {
            if (chatId) {
                this.currentChatId = chatId;
                this.loadChat(chatId);
            }
        });
    }

    loadChat(chatId: string) {
        this.httpService.get<Message[]>(`dms/messages/${chatId}`).subscribe({
            next: (res) => {
                this.messages = res;
            },
            error: (err) => { }
        });
    }

    // messages = [
    //     { text: 'hello!', isMine: false, senderName: 'bob1', timestamp: '09:00 AM' },
    //     { text: 'hi!', isMine: true, senderName: 'me', timestamp: '09:01 AM' },
    //     { text: 'checking', isMine: false, senderName: 'Bob2', timestamp: '09:02 AM' },
    // ];
}
