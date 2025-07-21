import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../../../core/services/http/httpConnection.service';
import { LocalStorageService } from '../../../../core/services/localStorage/localStorage.service';
import { ChatSelectionService } from '../../../chat-selection.service';
import { Chat } from '../../../../shared/types/chat.type';
import { UserInfo } from '../../../../shared/types/user.type';
import { Dm } from '../../../../shared/types/dm.type';
import { Group } from '../../../../shared/types/group.type';

@Component({
    selector: 'app-sidebar-chat-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidebar-chat-list.component.html',
    styleUrl: './sidebar-chat-list.component.css'
})
export class SidebarChatListComponent {
    chats: Chat[] = [];
    @Output() messages = new EventEmitter<string>;
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
            const userId = JSON.parse(user).username;

            this.httpService.get<Dm[]>(`dms/${userId}`).subscribe({
                next: (res) => {
                    this.chats = res.map(dm => dm);
                },
                error: (err) => { }
            });

            this.httpService.get<Group[]>(`groups/${userId}`).subscribe({
                next: (res) => {
                    this.chats.push(...res.map(group => group));
                },
                error: (err) => { }
            });
        }
    }

    onChatClicked(chat: Chat) {
        this.chatSelectionService.setSelectedChat(chat);
    }

    chatName(chatId: Chat): string {
        if (chatId.chatType === 'Groups') {
            return (chatId as Group).groupName;
        }
        else {
            return this.user.username === chatId.membersList[0]
                ? chatId.membersList[1]
                : chatId.membersList[0];
        }
    }

}
