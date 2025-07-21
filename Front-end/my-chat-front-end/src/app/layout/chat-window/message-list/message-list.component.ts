import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../../core/services/http/httpConnection.service';
import { ChatSelectionService } from '../../chat-selection.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';
import { MessagesRo } from '../../../common/ro/messages/messages.ro';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-message-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message-list.component.html',
    styleUrl: './message-list.component.css'
})
export class MessageListComponent {
    messages: MessagesRo;
    username: string;
    currentChatId: string;
    socket: Socket;

    constructor(
        private httpService: HttpService,
        private localStorage: LocalStorageService,
        private chatSelectionService: ChatSelectionService,
    ) { }

    ngOnInit() {
        const u = this.localStorage.getItem('user');
        this.username = JSON.parse(u as string).username;

        // this.socket = io('http://localhost:3000', {
        //     auth: {
        //         username: this.username,
        //     }
        // });

        this.chatSelectionService.getSelectedChat().subscribe(chat => {
            if (chat) {
                this.currentChatId = chat._id;
                this.loadChat(chat._id);
            }
        });

        
        // this.getNewMessage().subscribe({
        //     next: (res) => {
        //         this.messages = res;
        //     }
        // });
    }

    loadChat(chatId: string) {
        this.httpService.get<MessagesRo>(`dms/messages/${chatId}`).subscribe({
            next: (res) => {
                this.messages = res;
            },
            error: (err) => { }
        });
    }

    
    // getNewMessage(): Observable<MessagesRo> {
    //     return new Observable((observer) => {
    //         this.socket.on('newDm', (data) => {
    //             observer.next(data);
    //         });
    //     });
    // }
}
