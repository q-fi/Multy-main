import { Base } from './base';
import { Movie } from './movie';

export enum RoleName {
  SUDO = 'sudo',
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

export type User = {
  username: string;
  email: string;
  isActivated: boolean;
  isBanned: boolean;
  roles: RoleName[];
  movies: Movie[];
} & Base;
