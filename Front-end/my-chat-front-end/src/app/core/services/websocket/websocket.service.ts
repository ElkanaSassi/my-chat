import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject } from 'rxjs';
import { SocketEvent } from './websocket-events.enum';

export const environment = {
  production: false,
  socketUrl: 'ws://localhost:3000',
};

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;
  public incoming$ = new Subject<any>();

  constructor() {
    this.connect();
  }

  private connect() {
    this.socket$ = webSocket(environment.socketUrl);

    this.socket$.subscribe({
      next: (msg) => this.incoming$.next(msg),
      error: (err) => console.error('WebSocket error:', err),
      complete: () => console.log('WebSocket connection closed'),
    });
  }

  send(event: SocketEvent, data: any) {
    this.socket$.next({ event, data });
  }

  close() {
    this.socket$.complete();
  }
}