import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from 'src/director/entities/director.entity';
import { Star } from 'src/star/entities/star.entity';
import { Movie, Genre, PEGI } from 'src/movie/entities/movie.entity';
import { moviesData } from './mockdata';

@Injectable()
export class MockService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    @InjectRepository(Star)
    private readonly starRepository: Repository<Star>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  async createMockupData() {
    const directors = await this.saveDirectorsFromMoviesData();
    const stars = await this.saveStarsFromMoviesData();
    await this.saveMoviesFromData(directors, stars);

    console.log('Mockup data created successfully');
  }

  private async saveDirectorsFromMoviesData(): Promise<Director[]> {
    const directors: Director[] = [];

    for (const movieData of moviesData) {
      const directorName = movieData.directorData.fullname;

      const existingDirector = directors.find(
        (d) => d.fullname === directorName,
      );
      if (!existingDirector) {
        const director = this.directorRepository.create({
          fullname: directorName,
        });
        await this.directorRepository.save(director);
        directors.push(director);
      }
    }

    return directors;
  }

  private async saveStarsFromMoviesData(): Promise<Star[]> {
    const stars: Star[] = [];

    for (const movieData of moviesData) {
      for (const starData of movieData.starsData) {
        const starName = starData.fullname;

        const existingStar = stars.find((s) => s.fullname === starName);
        if (!existingStar) {
          const star = this.starRepository.create(starData);
          await this.starRepository.save(star);
          stars.push(star);
        }
      }
    }

    return stars;
  }

  private async saveMoviesFromData(
    directors: Director[],
    stars: Star[],
  ): Promise<void> {
    for (const movieData of moviesData) {
      const director = directors.find(
        (d) => d.fullname === movieData.directorData.fullname,
      );
      const movieStars = stars.filter((s) =>
        movieData.starsData.some((sd) => sd.fullname === s.fullname),
      );

      const movie = this.movieRepository.create({
        title: movieData.title,
        genres: movieData.genres,
        description: movieData.description,
        rating: movieData.rating,
        pegi: movieData.pegi,
        imageUrl: movieData.imageUrl,
        hasOscar: movieData.hasOscar,
        duration: movieData.duration,
        year: movieData.year,
        director,
        stars: movieStars,
      });

      await this.movieRepository.save(movie);
    }
  }
}
