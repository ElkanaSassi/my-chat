import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoginSuccessful: boolean = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private localStorage: LocalStorageService,
        private fb: FormBuilder,
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/layout/sidebar/chats']);
        }
    }

    onSubmit() {
        const login = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password,
        }

        this.authService.login(login).subscribe({
            next: (res) => {
                this.localStorage.setItem('user', JSON.stringify(res.user));
                this.router.navigate(['/layout']);
            },
            error: (err) => {
                this.isLoginSuccessful = false;
            }
        });
    }
}
