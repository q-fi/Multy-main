import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../../types/movie';
import { Star } from '../../types/star';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Director } from '../../types/director';

@Component({
  selector: 'app-change-stars',
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
  templateUrl: './change-stars.component.html',
  styleUrl: './change-stars.component.scss',
})
export class ChangeStarsComponent {
  movieId: string | null = null;
  movieStars: Star[] = [];
  allStars: Star[] = [];
  filteredStars: Star[] = [];
  searchText: string = '';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private navigator: Router
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.dataService.getMovie(this.movieId).subscribe((movie: Movie) => {
        if (movie.stars) this.movieStars = movie.stars;
      });
    }
    this.dataService.getActors().subscribe((stars: Star[]) => {
      this.allStars = stars;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase().trim();
    this.filteredStars = this.allStars.filter((star) =>
      star.fullname.toLowerCase().includes(filterValue)
    );
  }

  isStarSelected(star: Star): boolean {
    return this.movieStars.some((movieStar) => movieStar.id === star.id);
  }

  toggleStar(star: Star): void {
    if (this.isStarSelected(star)) {
      this.movieStars = this.movieStars.filter(
        (movieStar) => movieStar.id !== star.id
      );
    } else {
      this.movieStars.push(star);
    }
  }

  saveChanges(): void {
    if (this.movieId) {
      console.log(this.movieStars);
      this.dataService
        .updateMovieStars(this.movieId, this.movieStars)
        .subscribe(
          () => {
            console.log('Movie stars updated successfully');
            this.navigator.navigate(['/movies/', `${this.movieId}`]);
          },
          (error) => {
            console.error('Error updating movie stars:', error);
          }
        );
    }
  }
}
