import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-header',
  imports: [RouterModule],
  templateUrl: './sidebar-header.component.html',
  styleUrl: './sidebar-header.component.css'
})
export class SidebarHeaderComponent {
  constructor(private router: Router) { }

  navigateTo(tab: 'contacts' | 'chats') {
    this.router.navigate(['sidebar', tab]);
  }
}
