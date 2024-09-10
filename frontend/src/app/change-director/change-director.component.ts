import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../../types/movie';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatLabel,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Director } from '../../types/director';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-change-director',
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
  ],
  templateUrl: './change-director.component.html',
  styleUrl: './change-director.component.scss',
})
export class ChangeDirectorComponent {
  movieId: string | null = null;
  movieDirector?: Director;
  allDirectors: Director[] = [];
  filteredDirectors: Director[] = [];
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
        if (movie.director) this.movieDirector = movie.director;
      });
    }
    this.dataService.getDirectors().subscribe((directors: Director[]) => {
      this.allDirectors = directors;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase().trim();
    this.filteredDirectors = this.allDirectors.filter((director) =>
      director.fullname.toLowerCase().includes(filterValue)
    );
  }

  isDirectorSelected(director: Director): boolean {
    if(this.movieDirector){
      return this.movieDirector !== null && this.movieDirector.id === director.id;
    }
    return false
  }

  onDirectorChange(director: Director): void {
    this.movieDirector = director;
  }

  saveChanges(): void {
    if (this.movieId && this.movieDirector) {
      this.dataService
        .updateMovieDirector(this.movieId, this.movieDirector)
        .subscribe(
          () => {
            console.log('Movie director updated successfully');
            this.navigator.navigate(['/movies/', `${this.movieId}`]);
          },
          (error) => {
            console.error('Error updating movie director:', error);
          }
        );
    }
  }
}
