import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/entities/baseEntity.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Entity()
export class Star extends BaseEntity {
  @Column({ unique: true })
  @ApiProperty({ description: 'The name of the actor.' })
  fullname: string;

  @Column({ default: false })
  @ApiProperty({
    description: 'Flag indicating if the actor has won an Oscar.',
  })
  hasOscar: boolean;

  @ManyToMany(() => Movie, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'movie_star',
    joinColumn: { name: 'star_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'movie_id', referencedColumnName: 'id' },
  })
  @ApiProperty({ description: 'The movies in which the actor has acted.' })
  movies: Movie[];
}
