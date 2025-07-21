import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../../../core/services/http/httpConnection.service';
import { LocalStorageService } from '../../../../core/services/localStorage/localStorage.service';
import { ChatSelectionService } from '../../../chat-selection.service';
import { ChatRo } from '../../../../common/ro/chats/chats.type';
import { UserInfoRo } from '../../../../common/ro/users/userInfo.ro';
import { DmRo } from '../../../../common/ro/dms/dms.ro';
import { GroupRo } from '../../../../common/ro/groups/groups.ro';

@Component({
    selector: 'app-sidebar-chat-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidebar-chat-list.component.html',
    styleUrl: './sidebar-chat-list.component.css'
})
export class SidebarChatListComponent {
    chats: ChatRo[] = [];
    @Output() messages = new EventEmitter<string>;
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
            const userId = JSON.parse(user).username;

            this.httpService.get<DmRo[]>(`dms/${userId}`).subscribe({
                next: (res) => {
                    this.chats = res.map(dm => dm);
                },
                error: (err) => { }
            });

            this.httpService.get<GroupRo[]>(`groups/${userId}`).subscribe({
                next: (res) => {
                    this.chats.push(...res.map(group => group));
                },
                error: (err) => { }
            });
        }
    }

    onChatClicked(chat: ChatRo) {
        this.chatSelectionService.setSelectedChat(chat);
    }

    chatName(chatId: ChatRo): string {
        if (chatId.chatType === 'Groups') {
            return (chatId as GroupRo).groupName;
        }
        else {
            return this.user.username === chatId.membersList[0]
                ? chatId.membersList[1]
                : chatId.membersList[0];
        }
    }

}
