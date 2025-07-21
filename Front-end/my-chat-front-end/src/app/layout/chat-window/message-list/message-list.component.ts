import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../../core/services/http/httpConnection.service';
import { ChatSelectionService } from '../../chat-selection.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';
import { ChatWindowComponent } from '../chat-window.component';

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
    @Input() msgsId: string;

    messages: Message[];
    username: string;
    currentChatId: string;

    constructor(
        private httpService: HttpService,
        private localStorage: LocalStorageService,
    ) { }

    ngOnInit() {
        const u = this.localStorage.getItem('user');
        this.username = JSON.parse(u as string).username;
        
    }

    loadChat(chatId: string) {
        this.httpService.get<Message[]>(`dms/messages/${chatId}`).subscribe({
            next: (res) => {
                console.log(res);
                this.messages = res;
            },
            error: (err) => { }
        });
    }
}
