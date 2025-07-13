import { Component } from '@angular/core';
import { SidebarChatListComponent } from "./sidebar-chat-list/sidebar-chat-list.component";
import { SidebarHeaderComponent } from "./sidebar-header/sidebar-header.component";

@Component({
  selector: 'app-sidebar',
  imports: [SidebarChatListComponent, SidebarHeaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
