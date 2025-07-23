import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageService } from "../services/localStorage/localStorage.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private localStorage: LocalStorageService,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> | boolean {
        if (this.localStorage.getItem('user')) {
            return true;
        } else {
            // Redirect to the login page
            return this.router.navigate(['auth/login']);
        }
    }
}