import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-sidebar-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-list.component.html',
  styleUrl: './sidebar-list.component.css'
})
export class SidebarListComponent {

}
