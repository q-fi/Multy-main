import { Component } from '@angular/core';
import { RoleName, User } from '../../types/user';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [
    MatCardActions,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardContent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.scss',
})
export class FavouriteComponent {
  user!: User;

  constructor(private auth: AuthService, private dataService: DataService) {
    const cookieName = 'authToken';
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));
    if (cookieValue) {
      this.dataService
        .getUser(this.auth.decodeToken(cookieValue).id)
        .subscribe((user: User) => {
          this.user = user;
        });
    }
  }
}
