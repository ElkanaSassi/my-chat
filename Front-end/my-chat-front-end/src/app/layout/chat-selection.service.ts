import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatRo } from '../common/ro/chats/chats.type';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class ChatSelectionService {
    private selectedChat$ = new BehaviorSubject<ChatRo | null>(null);

    constructor(private socket: Socket) { }

    setSelectedChat(chat: ChatRo) {
        this.socket.emit('joinDm', chat._id);
        this.selectedChat$.next(chat);
    }

    getSelectedChat() {
        return this.selectedChat$.asObservable();
    }
}
