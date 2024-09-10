import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsBoolean,
  IsArray,
  IsISO8601,
  IsNumber,
} from 'class-validator';
import { Genre, PEGI } from '../entities/movie.entity';

export class CreateMovieDto {
  @ApiProperty({
    description: 'The title of the movie.',
    example: 'Myfilm',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The ID of the director.',
    example: 'directorId',
  })
  @IsOptional()
  @IsString()
  directorId?: string;

  @ApiProperty({
    description: 'The genres of the movie.',
    example: [Genre.ACTION, Genre.COMEDY],
  })
  @IsNotEmpty()
  genres: Genre[];

  @ApiProperty({
    description: 'The description of the movie.',
    example: 'Cool film',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The rating of the movie (0 to 100).',
    example: 88,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  rating: number;

  @ApiProperty({
    description: 'The PEGI rating of the movie.',
    example: PEGI.EIGHTEEN,
  })
  @IsNotEmpty()
  @IsEnum(PEGI)
  pegi: PEGI;

  @ApiProperty({ description: 'The image URL of the movie.', example: 'url' })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({ description: 'Whether the movie has won an Oscar.' })
  @IsOptional()
  @IsBoolean()
  hasOscar: boolean;

  @ApiProperty({
    description: 'The duration of the movie in ISO 8601 format (HH:MM:SS).',
    example: '02:15:30',
  })
  @IsNotEmpty()
  @IsString()
  @IsISO8601()
  duration: string;

  @ApiProperty({
    description: 'The release year of the movie.',
    example: 2022,
  })
  @IsOptional()
  @IsNumber()
  year?: number;
}

export class AddDirectorDto {
  @ApiProperty({ description: 'ID of the director', type: String })
  @IsString()
  readonly directorId: string | null;
}

export class AddStarsDto {
  @ApiProperty({ description: 'IDs of the stars', type: [String] })
  @IsArray()
  @IsString({ each: true })
  readonly starsIds: string[] | null;
}
export class UpdateMovieDto extends OmitType(CreateMovieDto, ['directorId']) {}
