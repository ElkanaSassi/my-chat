import { RouterModule, Routes } from "@angular/router";
import { SidebarChatListComponent } from "./sidebar-list/sidebar-chat-list/sidebar-chat-list.component";
import { SidebarContactsListComponent } from "./sidebar-list/sidebar-contacts-list/sidebar-contacts-list.component";
import { SidebarComponent } from "./sidebar.component";
import { NgModule } from "@angular/core";
import { SidebarListComponent } from "./sidebar-list/sidebar-list.component";

const routes: Routes = [
    {
        path: '', component: SidebarListComponent,
        children: [
            { path: 'chats', component: SidebarChatListComponent },
            { path: 'contacts', component: SidebarContactsListComponent },
            { path: '', redirectTo: 'chats', pathMatch: 'full' },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule {}