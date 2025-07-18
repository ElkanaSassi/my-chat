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
  selectedUserId: string = '';
  
  users = [
    { id: 'u1', name: 'Alice Smith' },
    { id: 'u2', name: 'Bob Johnson' },
    { id: 'u3', name: 'Charlie Lee' },
    { id: 'u4', name: 'Diana Prince' },
    { id: 'u5', name: 'Ethan Hunt' }
  ];

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
