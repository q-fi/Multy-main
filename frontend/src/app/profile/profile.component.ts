import { Component } from '@angular/core';
import { User, RoleName } from '../../types/user';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatDividerModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user!: User;
  roles!: RoleName[];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const cookieName = 'authToken';
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));
    if (cookieValue) {
      this.dataService
        .getUser(this.authService.decodeToken(cookieValue).id)
        .subscribe((user: User) => {
          this.user = user;
          this.roles = user.roles;
        });
    }
  }

  getRolesDisplay(roles: RoleName[]): string {
    return roles
      .map((role) => role.charAt(0).toUpperCase() + role.slice(1))
      .join(', ');
  }
  isAdmin() {
    return this.roles.some((v) => v === RoleName.ADMIN);
  }
}
