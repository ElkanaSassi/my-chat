import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';
import { UserInfoRo } from '../../../common/ro/users/userInfo.ro';

@Component({
    selector: 'app-sidebar-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar-header.component.html',
    styleUrl: './sidebar-header.component.css'
})
export class SidebarHeaderComponent {
    user: UserInfoRo;
    constructor(
        private router: Router,
        private localStorage: LocalStorageService,
    ) { }

    ngOnInit() {
        const user = this.localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
        }

        console.log('in init sideheader, username = ', this.user.username);
    }

    goToChats() {
        this.router.navigate(['/layout/sidebar/chats'], { skipLocationChange: true });
    }

    goToContacts() {
        this.router.navigate(['/layout/sidebar/contacts'], { skipLocationChange: true });
    }

    onLogOut() {
        this.localStorage.removeItem('user');
        this.router.navigate(['auth/login']);
    }
}
