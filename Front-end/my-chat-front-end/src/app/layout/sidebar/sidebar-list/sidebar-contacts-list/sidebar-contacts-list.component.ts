import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../../../core/services/http/httpConnection.service';

@Component({
  selector: 'app-sidebar-contacts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-contacts-list.component.html',
  styleUrl: './sidebar-contacts-list.component.css'
})
export class SidebarContactsListComponent {
  //constructor(private httpService: HttpService) {}

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
