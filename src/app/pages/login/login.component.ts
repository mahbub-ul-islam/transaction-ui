import {Component, NgZone} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {ApiUrlService} from '../../core/services/api-url.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    errorMessage: string = '';
    form: FormGroup;
    loginObj: any = {
        "username": "",
        "password": ""
    }

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
        private apiUrlService: ApiUrlService
    ) {
        this.form = this.fb.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        })
    }

    onSubmit() {
        if (this.form.valid) {
            this.loginObj.username = this.form.value.username;
            this.loginObj.password = this.form.value.password;
            this.onLogin();
        }
    }


    onLogin() {
        // debugger

        const apiUrl = this.apiUrlService.getAuthLoginUrl();

        this.http.post(apiUrl, this.loginObj).subscribe(
            (res: any) => {
                if (res.success) {
                    this.authService.login(res.token);
                    this.router.navigate(['/dashboard']);
                } else {
                    this.errorMessage = res.message;
                    console.log(res.message);
                }
            },
            (error) => {
                if (error.error && error.error.message) {
                    this.errorMessage = error.error.message;
                } else {
                    this.errorMessage = 'An error occurred during login. Please try again.';
                }
                console.log('Login failed:', error);
            }
        )
    }

}
