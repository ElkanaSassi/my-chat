import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../../../core/services/http/httpConnection.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar-contacts-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar-contacts-list.component.html',
  styleUrl: './sidebar-contacts-list.component.css'
})
export class SidebarContactsListComponent {
  //constructor(private httpService: HttpService) {}
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
    // Your logic here
  }

  contactsList = [
    {
      name: "shalom",
    },
    {
      name: "Yosef",
    },
  ]

  onContactAdd() {
    console.log('button clicked');
    //this.httpService.method('bla');
  }
}
