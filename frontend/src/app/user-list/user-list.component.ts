import { Component } from '@angular/core';
import { RoleName, User } from '../../types/user';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatLabel,
    MatFormField,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    RouterLink,
    MatRadioModule,
    MatDivider,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  roles;
  user!: User;
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.roles = Object.values(RoleName);
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((users: User[]) => {
      this.allUsers = users;
      this.applyFilter();
    });

    const cookieName = 'authToken';
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));
    if (cookieValue) {
      this.dataService
        .getUser(this.authService.decodeToken(cookieValue).id)
        .subscribe((user: User) => {
          this.user = user;
        });
    }
  }

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase().trim();
    this.filteredUsers = this.allUsers.filter((user) =>
      user.email.toLowerCase().includes(filterValue)
    );
  }

  toggleBan(user: User): void {
    this.filteredUsers.filter((v) => v.id === user.id)[0].isBanned ===
      !user.isBanned;
    if (!user.isBanned) {
      this.dataService.disBanUser(user.id).subscribe();
      return;
    }
    this.dataService.banUser(user.id).subscribe();
  }

  toggleRole(event: MatCheckboxChange, user: User, role: RoleName): void {
    if (event.checked) {
      this.filteredUsers.filter((v) => v.id === user.id)[0].roles.push(role);
    } else {
      this.filteredUsers
        .filter((v) => v.id === user.id)[0]
        .roles.splice(
          this.filteredUsers
            .filter((v) => v.id === user.id)[0]
            .roles.indexOf(role),
          1
        );
    }
    this.dataService.changeUserRoles(user.id, user.roles).subscribe();
  }
  isSudo(): boolean {
    return this.user?.roles.includes(RoleName.SUDO) ?? false;
  }
}
