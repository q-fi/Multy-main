import { Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies/movies.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { ChangeDirectorComponent } from './change-director/change-director.component';
import { ChangeStarsComponent } from './change-stars/change-stars.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { FavouriteComponent } from './favourite/favourite.component';

export const routes: Routes = [
  { path: 'app', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  {
    path: 'movies/add',
    component: AddMovieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favourite',
    component: FavouriteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/:id',
    component: MovieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/:id/edit',
    component: EditMovieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/:id/edit/stars',
    component: ChangeStarsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/:id/edit/director',
    component: ChangeDirectorComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
