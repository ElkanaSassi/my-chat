import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatSelectionService {
  private selectedChatId$ = new BehaviorSubject<string | null>(null);

  setSelectedChat(chatId: string) {
    this.selectedChatId$.next(chatId);
  }

  getSelectedChat() {
    return this.selectedChatId$.asObservable();
  }
}
