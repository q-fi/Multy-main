import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import {
  MatFormField,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';
import { Movie, Genre, PEGI } from '../../types/movie';
import { _isNumberValue } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-edit-movie',
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
    MatOption,
    MatRadioModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss',
})
export class EditMovieComponent implements OnInit {
  movieForm!: FormGroup;
  genres: Genre[] = Object.values(Genre);
  pegis = Object.values(PEGI)
    .filter((v) => _isNumberValue(v))
    .map((v) => +v);
  movieId!: string | null;
  movie!: Movie;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required],
      rating: ['', Validators.required],
      duration: ['', Validators.required],
      imageUrl: ['', Validators.required],
      genres: [[], Validators.required],
      pegi: ['', Validators.required],
      hasOscar: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('id');
      if (this.movieId) {
        this.dataService.getMovie(this.movieId).subscribe((movie: Movie) => {
          this.movie = movie;
          this.movieForm.patchValue(movie);
        });
      }
    });
  }

  saveMovie(): void {
    if (this.movieForm.valid) {
      const updatedMovie: Movie = { ...this.movie, ...this.movieForm.value };
      if (this.movieId) {
        this.dataService
          .updateMovie(this.movieId, updatedMovie)
          .subscribe(() => {
            this.router.navigate(['/movies/', `${this.movieId}`]);
            console.log('Movie updated successfully!');
          });
      }
    }
  }

  toggleGenreSelection(genre: Genre): void {
    const genres = this.movieForm.get('genres') as FormGroup;
    const genreArray = genres.value;
    const index = genreArray.indexOf(genre);

    if (index === -1) {
      genreArray.push(genre);
    } else {
      genreArray.splice(index, 1);
    }

    genres.patchValue(genreArray);
  }

  changePegi(pegi: PEGI): void {
    this.movieForm.get('pegi')?.setValue(pegi);
  }
}
