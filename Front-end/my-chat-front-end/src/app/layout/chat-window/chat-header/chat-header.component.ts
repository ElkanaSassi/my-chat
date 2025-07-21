import { Component } from '@angular/core';
import { ChatSelectionService } from '../../chat-selection.service';
import { HttpService } from '../../../core/services/http/httpConnection.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';
import { CommonModule } from '@angular/common';
import { ChatRo } from '../../../common/ro/chats/chats.type';
import { UserInfoRo } from '../../../common/ro/users/userInfo.ro';
import { GroupRo } from '../../../common/ro/groups/groups.ro';

@Component({
    selector: 'app-chat-header',
    imports: [CommonModule],
    templateUrl: './chat-header.component.html',
    styleUrl: './chat-header.component.css'
})
export class ChatHeaderComponent {
    currentChat: ChatRo;
    private user: UserInfoRo;

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

    chatName(chat: ChatRo): string {
        if (chat.chatType === 'Groups') {
            return (chat as GroupRo).groupName;
        }
        else {
            return this.user.username === chat.membersList[0]
                ? chat.membersList[1]
                : chat.membersList[0];
        }
    }
}
