import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    public isAuthenticated(): boolean {
        if (localStorage.getItem('user')) {
            return true;
        }
        return false;
    }
}
