// director.entity.ts
import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/entities/baseEntity.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Entity()
export class Director extends BaseEntity {
  @Column({ unique: true })
  @ApiProperty({ description: 'The name of the director.' })
  fullname: string;

  @OneToMany(() => Movie, (movie) => movie.director)
  @ApiProperty({ description: 'The movies directed by the director.' })
  movies: Movie[];
}
