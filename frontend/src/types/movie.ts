import { Base } from './base';
import { Director } from './director';
import { Star } from './star';
import { User } from './user';

export enum PEGI {
  THREE = 3,
  SEVEN = 7,
  TWELVE = 12,
  THIRTEEN = 13,
  SIXTEEN = 16,
  EIGHTEEN = 18,
}

export enum Genre {
  ACTION = 'Action',
  DRAMA = 'Drama',
  CRIME = 'Crime',
  COMEDY = 'Comedy',
  HORROR = 'Horror',
  ROMANCE = 'Romance',
  SCIENCE_FICTION = 'Science Fiction',
  THRILLER = 'Thriller',
  FANTASY = 'Fantasy',
  ADVENTURE = 'Adventure',
  ANIMATION = 'Animation',
  DOCUMENTARY = 'Documentary',
  SCIFI = 'Sci-Fi',
}

export type Movie = {
  title: string;
  director?: Director;
  genres: Genre[];
  description: string;
  rating: number;
  pegi: PEGI;
  duration: string;
  year: number;
  imageUrl: string;
  hasOscar: boolean;
  stars?: Star[];
  users?: User[];
} & Base;

export type PaginatedMovies = {
  movies: Movie[];
  currentPage: string;
  totalPages: number;
  totalCount: number;
};
