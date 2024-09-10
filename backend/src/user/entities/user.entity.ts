import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movie/entities/movie.entity';
import { BaseEntity } from 'src/database/entities/baseEntity.entity';

export enum RoleName {
  SUDO = 'sudo',
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ example: 'john_doe' })
  @Column({ nullable: false })
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: 'hashedPassword' })
  @Column({ nullable: false })
  hashedPassword: string;

  @ApiProperty({ example: false })
  @Column({ default: false, nullable: false })
  isActivated: boolean;

  @ApiProperty({ example: false })
  @Column({ default: false, nullable: false })
  isBanned: boolean;

  @Column({
    type: 'enum',
    enum: RoleName,
    array: true,
    default: [RoleName.USER],
    nullable: false,
  })
  @ApiProperty({
    enum: RoleName,
    isArray: true,
    description: 'The genres of the movie.',
  })
  roles: RoleName[];

  @ManyToMany(() => Movie, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'user_favourite_movie',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'movie_id', referencedColumnName: 'id' },
  })
  movies: Movie[];
}
