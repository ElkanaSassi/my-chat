import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../../../core/services/http/httpConnection.service';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../../core/services/localStorage/localStorage.service';

interface User {
    _id: string;
    username: string;
    password: string;
    singupData: string;
    contacts: string[];
    __v: number;
}

@Component({
    selector: 'app-sidebar-contacts-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './sidebar-contacts-list.component.html',
    styleUrl: './sidebar-contacts-list.component.css'
})
export class SidebarContactsListComponent {

    contactsList: string[] = []

    constructor(
        private httpService: HttpService,
        private localStorage: LocalStorageService,
    ) { }

    ngOnInit() {
        const user = this.localStorage.getItem('user');
        console.log(this.localStorage.getItem('user'));
        
        if (user) {
            this.httpService.get<User>('/users', JSON.parse(user)._id).subscribe({
                next: (res) => {
                    this.contactsList = res.contacts;
                },
                error: (err) => {

                }
            });
        }
    }
    showUsersPool = false;

    availableUsers = [
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Charlie' }
    ];

    onAddUser(user: any) {
        console.log('User to add:', user);
        this.availableUsers = this.availableUsers.filter(u => u !== user);
        this.contactsList.push(user);
    }


    // onContactAdd() {
    //   console.log('button clicked');
    //   //this.httpService.method('bla');
    // }
}
