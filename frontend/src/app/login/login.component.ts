import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFormError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataservice: DataService,
    private cookieService: CookieService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginFormSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value['email'];
      const password = this.loginForm.value['password'];

      this.dataservice
        .login(email, password)
        .pipe(
          catchError((error) => {
            this.loginFormError = 'Log in is failed. Please try again.';
            return throwError(error);
          })
        )
        .subscribe((response) => {
          if (response && response.token) {
            this.cookieService.set(
              'authToken',
              response.token,
              new Date().getDate() + 1
            );
          }
          if (this.auth.decodeToken(response.token).isBanned) {
            this.loginForm.get('email')?.setErrors({ banned: true });
            return;
          }
          this.router.navigate(['/home']);
        });
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
