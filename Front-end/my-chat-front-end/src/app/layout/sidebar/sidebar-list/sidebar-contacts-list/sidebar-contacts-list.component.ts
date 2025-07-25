import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../../../core/services/http/httpConnection.service';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../../core/services/localStorage/localStorage.service';
import { difference } from 'lodash';
import { CreateDmDto } from '../../../../common/dto/dms/create-dm.dto';

@Component({
    selector: 'app-sidebar-contacts-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './sidebar-contacts-list.component.html',
    styleUrl: './sidebar-contacts-list.component.css'
})
export class SidebarContactsListComponent {
    @Output() chatSelected = new EventEmitter<string>();
    contactsList: string[] = [];
    availableUsers: string[] = [];
    showUsersPool = false;

    constructor(
        private localStorage: LocalStorageService,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        const user = this.localStorage.getItem('user');

        if (user) {
            this.contactsList = JSON.parse(user).contacts;

            this.httpService.get<string[]>('users').subscribe({
                next: (res) => {
                    res = res.filter(u => u != JSON.parse(user).username);
                    this.availableUsers = difference(res, this.contactsList);
                },
                error: (err) => {

                }
            });
        }

    }


    onChatSelected(chatId: string) {
        this.chatSelected.emit(chatId);
    }

    onAddUser(contact: string) {
        const user = this.localStorage.getItem('user');
        const username = JSON.parse(user!).username;

        this.httpService.patch(`users/addContacts/${username}`, { "contact": contact })
            .subscribe({
                next: (res) => {
                    this.availableUsers = this.availableUsers.filter(u => u !== contact);
                    this.contactsList.push(contact);
                },
                error: (err) => {

                }
            });

        const newDm: CreateDmDto = {
            membersList: [username, contact]
        } 
        this.httpService.post(`dms`,newDm).subscribe();
    }
}
