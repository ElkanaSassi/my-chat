import { Routes } from '@angular/router';
import { SidebarChatListComponent } from './sidebar-list/sidebar-chat-list/sidebar-chat-list.component';
import { SidebarContactsListComponent } from './sidebar-list/sidebar-contacts-list/sidebar-contacts-list.component';

export const routes: Routes = [
  { path: 'chats', component: SidebarChatListComponent },
  { path: 'contacts', component: SidebarContactsListComponent },
];