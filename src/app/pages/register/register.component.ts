import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {ApiUrlService} from '../../core/services/api-url.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {

    errorMessage: string = '';
    successMessage: string = '';
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private apiUrlService: ApiUrlService
    ) {
        this.form = this.fb.group({
            username: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
    }

    onSubmit() {
        if (this.form.valid) {
            console.log(this.form.value);
            this.registerUser(this.form.value);
        }
    }

    registerUser(userData: any) {

        const apiUrl = this.apiUrlService.getAuthRegisterUrl();

        this.http.post(apiUrl, userData).subscribe(
            (res: any) => {
                if (res.success) {
                    this.successMessage = 'Registration successful! You can now log in.';
                    // Redirect to login after 3 seconds
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 2000);
                } else {
                    this.errorMessage = res.message;
                    console.log(res);
                }
            },
            (error) => {
                if (error.error && error.error.message) {
                    this.errorMessage = error.error.message;
                } else {
                    this.errorMessage = 'An unexpected error occurred. Please try again.';
                }
                console.log('Registration failed:', error);
            }
        );
    }

}
