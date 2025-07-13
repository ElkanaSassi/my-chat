import { Component } from '@angular/core';
import { SidebarChatListComponent } from "./sidebar-list/sidebar-chat-list/sidebar-chat-list.component";
import { SidebarContactsListComponent } from "./sidebar-list/sidebar-contacts-list/sidebar-contacts-list.component";
import { SidebarHeaderComponent } from "./sidebar-header/sidebar-header.component";
import { RouterOutlet } from '@angular/router';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarListComponent,
    SidebarHeaderComponent,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
