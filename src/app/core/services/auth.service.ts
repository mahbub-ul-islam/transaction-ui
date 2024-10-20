import {Injectable} from '@angular/core';
import {Router} from '@angular/router';


@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private router: Router) {}

    isLoggedIn(): boolean {
        return !!localStorage.getItem('loginToken');
    }

    login(token: string) {
        localStorage.setItem('loginToken', token);
    }

    logout() {
        localStorage.removeItem('loginToken');
        this.router.navigate(['/login']);
    }
}
