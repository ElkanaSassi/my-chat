import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chat } from '../shared/types/chat.type';

@Injectable({ providedIn: 'root' })
export class ChatSelectionService {
  private selectedChat$ = new BehaviorSubject<Chat | null>(null);

  setSelectedChat(chat: Chat) {
    this.selectedChat$.next(chat);
  }

  getSelectedChat() {
    return this.selectedChat$.asObservable();
  }
}
