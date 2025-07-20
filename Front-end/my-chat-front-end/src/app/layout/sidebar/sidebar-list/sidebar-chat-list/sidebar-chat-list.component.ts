import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../../../core/services/http/httpConnection.service';
import { LocalStorageService } from '../../../../core/services/localStorage/localStorage.service';
import { from, NotFoundError } from 'rxjs';
import { Expansion } from '@angular/compiler';
import { ChatSelectionService } from '../../../chat-selection.service';

export interface Chat {
    _id: string;
    chatType: string;
    membersList: string[];
    messages: Message[];
    createAt: string;
}

export interface Dm extends Chat {
}

export interface Group extends Chat {
    groupaName: string;
    admin: string;
    discription?: string;
}

export interface Message {
    from: string;
    dateTime: Date;
    data: string;
}

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

    constructor(
        private httpService: HttpService,
        private localStorage: LocalStorageService,
        private chatSelectionService: ChatSelectionService,
    ) { }

    ngOnInit() {
        const user = this.localStorage.getItem('user');
        if (user) {
            const userId = JSON.parse(user)._id;

            this.httpService.get<Dm[]>(`dms/${userId}`).subscribe({
                next: (res) => {
                    this.chats = res.map(dm => dm);
                },
                error: (err) => { }
            });

            this.httpService.get<Group[]>(`groups/${userId}`).subscribe({
                next: (res) => {
                    this.chats.concat(res.map(group => group));
                },
                error: (err) => { }
            });
        }
    }

    onChatClicked(chatId: string) {
        this.chatSelectionService.setSelectedChat(chatId);
        // this.messages.emit(chatId);

        // let path: string;
        // if (chat.chatType == "Dms") {
        //     path = `dms/messages/${chat._id}`;
        // }
        // else if (chat.chatType == "Groups") {
        //     path = `group/messages/${chat._id}`;
        // }
        // else {
        //     throw new Error('chat type donsen\'t exists.');
        // }

        // this.httpService.get<Message[]>(path).subscribe({
        //     next: (res) => {
        //         const messsagesList = res;
        //         console.log('messages: ', messsagesList);
        //         this.messages.emit(messsagesList);
        //     },
        //     error: (err) => { }
        // });
    }
}
