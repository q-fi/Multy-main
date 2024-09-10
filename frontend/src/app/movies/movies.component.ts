import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Genre, Movie, PEGI, PaginatedMovies } from '../../types/movie';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { _isNumberValue } from '@angular/cdk/coercion';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RoleName } from '../../types/user';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-movies',
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
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  constructor(
    private readonly dataService: DataService,
    private readonly auth: AuthService
  ) {}
  ngOnInit(): void {
    this.fetchMovies();
    const cookieName = 'authToken';
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));
    if (cookieValue) {
      this.roles = this.auth.decodeToken(cookieValue).roles;
    }
  }
  paginatedMovies!: PaginatedMovies;
  page = 1;
  limit = 1;
  genres = Object.values(Genre);
  pegis = Object.values(PEGI)
    .filter((v) => _isNumberValue(v))
    .map((v) => +v);

  selectedGenres: Genre[] = [];
  selectedPegis: PEGI[] = [];
  searchedGenres: Genre[] = [];
  searchedPegis: PEGI[] = [];
  minRating: number = 0;
  roles: RoleName[] = [];

  isAdmin() {
    return this.roles.some((v) => v === RoleName.ADMIN);
  }

  onSearch(): void {
    this.page = 1;
    this.searchedGenres = JSON.parse(JSON.stringify(this.selectedGenres));
    this.searchedPegis = JSON.parse(JSON.stringify(this.selectedPegis));
    this.dataService
      .getMovies(
        this.page,
        this.limit,
        this.selectedGenres,
        this.selectedPegis,
        this.minRating
      )
      .subscribe(
        (paginatedMovies: PaginatedMovies) => {
          this.paginatedMovies = paginatedMovies;
          console.log('Fetched 3 movies:', this.paginatedMovies);
        },
        (error) => {
          console.error('Error fetching movies:', error);
        }
      );
  }

  toggleGenreSelection(genre: Genre): void {
    const index = this.selectedGenres.indexOf(genre);
    if (index !== -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genre);
    }
  }

  togglePegiSelection(pegi: number): void {
    const index = this.selectedPegis.indexOf(pegi);
    if (index !== -1) {
      this.selectedPegis.splice(index, 1);
    } else {
      this.selectedPegis.push(pegi);
    }
  }

  fetchMovies(): void {
    this.dataService
      .getMovies(
        this.page,
        this.limit,
        this.selectedGenres,
        this.selectedPegis,
        this.minRating
      )
      .subscribe(
        (paginatedMovies: PaginatedMovies) => {
          this.paginatedMovies = paginatedMovies;
          console.log('Fetched 3 movies:', this.paginatedMovies);
        },
        (error) => {
          console.error('Error fetching movies:', error);
        }
      );
  }

  nextPage(): void {
    if (this.page === this.paginatedMovies.totalPages) return;
    this.page += 1;
    this.dataService
      .getMovies(
        this.page,
        this.limit,
        this.searchedGenres,
        this.searchedPegis,
        this.minRating
      )
      .subscribe(
        (paginatedMovies: PaginatedMovies) => {
          this.paginatedMovies = paginatedMovies;
          console.log('Fetched 3 movies:', this.paginatedMovies);
        },
        (error) => {
          console.error('Error fetching movies:', error);
        }
      );
  }

  backPage(): void {
    if (this.page === 1) return;
    this.page -= 1;
    this.dataService
      .getMovies(
        this.page,
        this.limit,
        this.searchedGenres,
        this.searchedPegis,
        this.minRating
      )
      .subscribe(
        (paginatedMovies: PaginatedMovies) => {
          this.paginatedMovies = paginatedMovies;
          console.log('Fetched 3 movies:', this.paginatedMovies);
        },
        (error) => {
          console.error('Error fetching movies:', error);
        }
      );
  }
}
