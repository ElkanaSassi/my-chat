import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http/httpConnection.service';
import { Observable } from 'rxjs';
import { UserInfoRo } from '../../common/ro/users/userInfo.ro';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userInfo: UserInfoRo;
    constructor(private httpService: HttpService) {
        this.loadUserFromStorage();
    }

    private loadUserFromStorage(): void {
        const stored = localStorage.getItem('user');
        if (stored) {
            //this.userInfo = JSON.parse(stored);
        }
    }

    public isLoggedIn(): boolean {
        return !!this.userInfo;
    }

    login(credentials: { username: string; password: string }): Observable<any> {
        return this.httpService.post('auth/login', credentials);
    }

    register(data: any): Observable<any> {
        return this.httpService.post('auth/register', data);
    }
}
