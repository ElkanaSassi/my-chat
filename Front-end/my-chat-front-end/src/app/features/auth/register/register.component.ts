import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../../../core/services/localStorage/localStorage.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm: FormGroup;
    isRegisterSuccessful: boolean = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private localStorage: LocalStorageService,
        private fb: FormBuilder,
    ) {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        const register = {
            username: this.registerForm.value.username,
            password: this.registerForm.value.password,
        }
        
        this.authService.register(register).subscribe({
            next: (res) => {
                this.localStorage.setItem('user', JSON.stringify(res.user));
                this.router.navigate(['/layout/sidebar/chats']);
            },
            error: (err) => {
                this.isRegisterSuccessful = false;
            }
        });
    }

}
