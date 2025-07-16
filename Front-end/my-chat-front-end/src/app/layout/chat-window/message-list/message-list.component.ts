import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages = [
    { text: 'hello!', isMine: false, senderName: 'bob1', timestamp: '09:00 AM' },
    { text: 'hi!', isMine: true, senderName: 'me', timestamp: '09:01 AM' },
    { text: 'checking', isMine: false, senderName: 'Bob2', timestamp: '09:02 AM' },
  ];
}
