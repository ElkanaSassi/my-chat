import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-sidebar-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-list.component.html',
  styleUrl: './sidebar-list.component.css'
})
export class SidebarListComponent {
  @Output() chatSelected = new EventEmitter<string>();

  onChatSelected(chatId: string) {
    this.chatSelected.emit(chatId);
  }

}
