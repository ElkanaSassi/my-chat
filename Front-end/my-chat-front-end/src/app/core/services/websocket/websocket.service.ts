import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../env/environment';
import { Messages, MessagesRo } from '../../../common/ro/messages/messages.ro';


@Injectable({ providedIn: 'root' })
export class WebSocketService {
    private socket: Socket;

    constructor() {
        this.socket = io(environment.apiUrl);
    }

    joinRoom(data: string) {
        console.log('joining room');
        this.socket.emit('joinDm', data)
    }

    sendDm(data: any) {
        this.socket.emit('sendDm', data);
    }

    getDmMessages(): Observable<MessagesRo> {
        return new Observable((observer) => {
            this.socket.on('newDm', (data: MessagesRo) => {
                observer.next(data);
            });
        })
    }

    sendGroupMessage(data: any) {
        this.socket.emit('sendGroupMessage', data);
    }

    getGroupMessages(): Observable<MessagesRo> {
        return new Observable((observer) => {
            this.socket.on('newGroup', (data: MessagesRo) => {
                observer.next(data);
            });
        })
    }
}