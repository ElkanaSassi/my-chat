import { Component, HostListener } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ChatWindowComponent } from "./chat-window/chat-window.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatSelectionService } from './chat-selection.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, SidebarComponent, ChatWindowComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
})
export class LayoutComponent {
    showPlaceHolder: boolean = true;
    constructor(
        private chatSelectionService: ChatSelectionService,
    ) { }

    ngOnInit() {
        this.chatSelectionService.getSelectedChat().subscribe(chat => {
            if (chat) {
                this.showPlaceHolder = false;
            }
        })
    }

    @HostListener('document:keydown.escape', ['$event'])
    onEscKey(event: Event): void {
        this.showPlaceHolder = true;
    }
}
