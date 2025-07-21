import { Component } from '@angular/core';
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageInputComponent } from "./message-input/message-input.component";
import { Subscription } from 'rxjs';
import { ChatSelectionService } from '../chat-selection.service';
import { HttpService } from '../../core/services/http/httpConnection.service';
import { LocalStorageService } from '../../core/services/localStorage/localStorage.service';


export interface Message {
    from: string;
    dateTime: Date;
    data: string;
}

@Component({
    selector: 'app-chat-window',
    imports: [ChatHeaderComponent, MessageListComponent, MessageInputComponent],
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent {
    
    username: string;
    private sub: Subscription;
    currentChatId: string;

    
    constructor(

        private chatSelectionService: ChatSelectionService,
        private localStorage: LocalStorageService,
    ) { }

    ngOnInit() {
        const u = this.localStorage.getItem('user');
        this.username = JSON.parse(u as string).username;

        this.sub = this.chatSelectionService.getSelectedChat().subscribe(chatId => {
            if (chatId) {
                this.currentChatId = chatId;
            }
        });
    }
    

}
