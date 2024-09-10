import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { DatabaseService } from 'src/database/database.service';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class UserService extends DatabaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
    protected readonly movieService: MovieService,
  ) {
    super(repository);
  }
  getUserByEmail(email: string): Observable<User> {
    return from(this.repository.findOne({ where: { email } }));
  }
  activateUser(id: string): Observable<UpdateResult> {
    return from(this.repository.update(id, { isActivated: true }));
  }
  addMovieToFavourite(
    userId: string,
    movieId: string,
  ): Observable<User | UpdateResult> {
    return from(
      this.repository.findOne({
        where: { id: userId },
        relations: ['movies'],
      }),
    ).pipe(
      switchMap((user) => {
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return this.movieService.findById(movieId).pipe(
          switchMap((movie) => {
            if (!movie) {
              throw new NotFoundException('Movie not found');
            }
            user.movies.push(movie);
            return from(this.repository.save(user));
          }),
          catchError((error) => throwError(error)),
        );
      }),
      catchError((error) => throwError(error)),
    );
  }

  removeMovieFromFavourite(
    userId: string,
    movieId: string,
  ): Observable<User | UpdateResult> {
    return from(
      this.repository.findOne({
        where: { id: userId },
        relations: ['movies'],
      }),
    ).pipe(
      switchMap((user) => {
        if (!user) {
          throw new NotFoundException('User not found');
        }
        const movieIndex = user.movies.findIndex(
          (movie) => movie.id === movieId,
        );
        if (movieIndex === -1) {
          throw new NotFoundException("Movie not found in user's favourites");
        }
        user.movies.splice(movieIndex, 1); // Remove movie from favourites
        return from(this.repository.save(user));
      }),
      catchError((error) => throwError(error)),
    );
  }
}
