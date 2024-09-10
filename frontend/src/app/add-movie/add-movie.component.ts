import { _isNumberValue } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import {
  MatLabel,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Genre, PEGI, Movie } from '../../types/movie';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-movie',
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
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss',
})
export class AddMovieComponent implements OnInit {
  movieForm!: FormGroup;
  genres: Genre[] = Object.values(Genre);
  pegis = Object.values(PEGI)
    .filter((v) => _isNumberValue(v))
    .map((v) => +v);
  movie: Movie = {
    duration: '',
    title: '',
    description: '',
    rating: 0,
    year: new Date().getFullYear(),
    genres: [Genre.ACTION],
    pegi: PEGI.EIGHTEEN,
    hasOscar: false,
    imageUrl:
      'https://img.freepik.com/free-vector/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1715385600&semt=sph',
  };

  constructor(
    private formBuilder: FormBuilder,
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
    this.movieForm.patchValue(this.movie);
  }

  saveMovie(): void {
    if (this.movieForm.valid) {
      const updatedMovie: Movie = { ...this.movieForm.value };
      this.dataService.postMovie(updatedMovie).subscribe((mov) => {
        this.router.navigate(['/movies/', `${mov.id}`]);
        console.log('Movie updated successfully!');
      });
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
