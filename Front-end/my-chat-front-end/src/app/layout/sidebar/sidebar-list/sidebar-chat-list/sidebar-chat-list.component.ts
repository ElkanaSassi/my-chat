import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-chat-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-chat-list.component.html',
  styleUrl: './sidebar-chat-list.component.css'
})
export class SidebarChatListComponent {
  chats = [
    {
      name: "Mom",
    },
    {
      name: "Bro",
    }
  ]
}
