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
    { text: 'Hey team!', isMine: false, senderName: 'Alice', timestamp: '09:00 AM' },
    { text: 'Hi Alice!', isMine: true, senderName: 'Me', timestamp: '09:01 AM' },
    { text: 'Meeting at 10?', isMine: false, senderName: 'Bob', timestamp: '09:02 AM' },
    { text: 'Yes, confirmed.', isMine: true, senderName: 'Me', timestamp: '09:03 AM' },
  ];
}
