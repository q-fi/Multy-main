import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre, Movie, PEGI } from './entities/movie.entity';
import { DatabaseService } from 'src/database/database.service';
import { DirectorService } from 'src/director/director.service';
import {
  Observable,
  from,
  map,
  switchMap,
} from 'rxjs';
import { StarService } from 'src/star/star.service';

type FilteredMoviesResponse = {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

@Injectable()
export class MovieService extends DatabaseService<Movie> {
  constructor(
    @InjectRepository(Movie)
    protected readonly repository: Repository<Movie>,
    private readonly directorService: DirectorService,
    private readonly starService: StarService,
  ) {
    super(repository);
  }


  filter(
    page: number,
    limit: number,
    genres: Genre[],
    pegi: PEGI[],
    rating: number,
  ): Observable<FilteredMoviesResponse> {
    const queryBuilder = this.repository.createQueryBuilder('movie');
    if (genres && genres.length > 0) {
      queryBuilder.andWhere(
        'EXISTS (SELECT 1 FROM UNNEST(movie.genres) g WHERE g = ANY(:genres))',
        { genres },
      );
    }

    if (pegi && pegi.length > 0) {
      queryBuilder.andWhere('movie.pegi IN (:...pegi)', { pegi });
    }

    if (rating) {
      queryBuilder.andWhere('movie.rating >= :rating', { rating });
    }

    // Pagination
    return from(
      queryBuilder
        .take(limit)
        .skip((page - 1) * limit)
        .getManyAndCount(),
    ).pipe(
      map(([movies, totalCount]) => {
        const totalPages = Math.ceil(totalCount / limit);
        return {
          movies,
          currentPage: page,
          totalPages,
          totalCount,
        };
      }),
    );
  }

  addDirectorToMovie(
    movieId: string,
    directorId: string | null,
  ): Observable<Movie> {
    return this.findById(movieId).pipe(
      switchMap((movie) => {
        if (!movie) {
          throw new NotFoundException('Movie not found');
        }
        if (!directorId) {
          movie.director = null;
          return this.repository.save(movie);
        }
        return this.directorService.findById(directorId).pipe(
          switchMap((director) => {
            if (!director) {
              throw new NotFoundException('Director not found');
            }
            movie.director = director;
            return this.repository.save(movie);
          }),
        );
      }),
    );
  }

  addActorsToMovie(movieId: string, starsIds: string[]): Observable<Movie> {
    return this.findById(movieId).pipe(
      switchMap((movie) => {
        if (!movie) {
          throw new NotFoundException('Movie not found');
        }
        if (!starsIds) {
          movie.stars = null;
          return this.repository.save(movie);
        }
        return this.starService.findByIds(starsIds).pipe(
          switchMap((stars) => {
            if (stars.length !== starsIds.length) {
              throw new NotFoundException('One or more actors not found');
            }
            movie.stars = stars;
            return this.repository.save(movie);
          }),
        );
      }),
    );
  }
}
