import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../core/services/http/httpConnection.service';
import { Message } from '../../../shared/types/message.type';
import { ChatSelectionService } from '../../chat-selection.service';
import { Chat } from '../../../shared/types/chat.type';
import { CommonModule } from '@angular/common';
import { Group } from '../../../shared/types/group.type';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';
import { UserInfo } from '../../../shared/types/user.type';

@Component({
    selector: 'app-message-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './message-input.component.html',
    styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
    messageText: string = '';
    currentChat: Chat;
    user: UserInfo;

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
        const path = this.currentChat.chatType === 'Dms'
            ? `dms/messages/${this.currentChat._id}`
            : `groups/messages/${this.currentChat._id}`;

        if (this.messageText) {
            const completeMessage: Message = {
                from: this.user.username,
                data: this.messageText,
            }

            this.httpService.post<Message>(path, completeMessage).subscribe();
            this.messageText = '';
        }
    }

}
