import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registration',
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
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataservice: DataService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerFormSubmit(): void {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.value['email'];
      const username = this.registrationForm.value['username'];
      const password = this.registrationForm.value['password'];

      this.dataservice
        .registrate(email, username, password)
        .pipe(
          catchError((error) => {
            this.registrationError = 'Registration failed. Please try again.';
            return throwError(error);
          })
        )
        .subscribe((response) => {
          if (response && response.token) {
            this.cookieService.set('authToken', response.token);
          }
          this.router.navigate(['/login']);
        })
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
