import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(public auth: AuthService, private router: Router) {}

    canActivate(): boolean {
        // Return true is login
        if (this.auth.isAuthenticated()) {
            return true;
        }
        
        // If not logged in navigate to landing page
        this.router.navigate(['/']);
        return false;
    }

}
