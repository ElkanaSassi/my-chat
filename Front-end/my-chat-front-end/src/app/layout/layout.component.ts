import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ChatWindowComponent } from "./chat-window/chat-window.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ChatWindowComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
