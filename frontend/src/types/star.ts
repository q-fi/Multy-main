import { Base } from './base';
import { Movie } from './movie';

export type Star = {
  fullname: string;
  hasOscar: boolean;
  movies: Movie[];
} & Base;
