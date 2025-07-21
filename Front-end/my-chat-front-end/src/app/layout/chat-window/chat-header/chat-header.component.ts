import { Component } from '@angular/core';
import { ChatSelectionService } from '../../chat-selection.service';
import { HttpService } from '../../../core/services/http/httpConnection.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';
import { CommonModule } from '@angular/common';
import { Chat } from '../../../shared/types/chat.type';
import { UserInfo } from '../../../shared/types/user.type';
import { Group } from '../../../shared/types/group.type';

@Component({
    selector: 'app-chat-header',
    imports: [CommonModule],
    templateUrl: './chat-header.component.html',
    styleUrl: './chat-header.component.css'
})
export class ChatHeaderComponent {
    currentChat: Chat;
    private user: UserInfo;

    constructor(
        private httpService: HttpService,
        private localStorage: LocalStorageService,
        private chatSelectionService: ChatSelectionService,
    ) { }

    ngOnInit() {
        const user = this.localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
        }

        this.chatSelectionService.getSelectedChat().subscribe(chat => {
            if (chat) {
                this.currentChat = chat;
            }
        });
    }

    chatName(chat: Chat): string {
        if (chat.chatType === 'Groups') {
            return (chat as Group).groupName;
        }
        else {
            return this.user.username === chat.membersList[0]
                ? chat.membersList[1]
                : chat.membersList[0];
        }
    }
}
