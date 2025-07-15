import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { SidebarChatListComponent } from './sidebar-list/sidebar-chat-list/sidebar-chat-list.component';
import { SidebarContactsListComponent } from './sidebar-list/sidebar-contacts-list/sidebar-contacts-list.component';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';

export const routes: Routes = [
  { path: 'chats', component: SidebarChatListComponent },
  { path: 'contacts', component: SidebarContactsListComponent },
];