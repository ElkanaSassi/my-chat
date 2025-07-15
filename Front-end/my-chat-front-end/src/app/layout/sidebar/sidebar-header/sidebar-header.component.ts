import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-header.component.html',
  styleUrl: './sidebar-header.component.css'
})
export class SidebarHeaderComponent {
  
  constructor(private router: Router) { }

  goToChats() {
    this.router.navigateByUrl('/sidebar/chats', { skipLocationChange: true });
  }

  goToContacts() {
    this.router.navigateByUrl('/sidebar/contacts', { skipLocationChange: true });
  }
}
