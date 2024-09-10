// movie.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Genre, Movie, PEGI } from './entities/movie.entity';
import {
  AddDirectorDto,
  AddStarsDto,
  CreateMovieDto,
  UpdateMovieDto,
} from './dto/movie.dto';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleName } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  convertToArray<T>(input: string, transform?: (value: string) => T): T[] {
    if (!input || typeof input !== 'string') {
      return [];
    }

    const arrayValues = input.split(',').map((value) => value.trim());

    if (transform) {
      return arrayValues.map(transform);
    }

    return arrayValues as any;
  }
  @Role(RoleName.MODERATOR, RoleName.ADMIN, RoleName.USER)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all movies.',
    type: Movie,
    isArray: true,
  })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({
    name: 'genres',
    required: false,
    type: String,
    isArray: true,
    example: [Genre.ACTION, Genre.DRAMA],
  })
  @ApiQuery({
    name: 'pegi',
    required: false,
    type: Number,
    isArray: true,
    example: [PEGI.EIGHTEEN, PEGI.SIXTEEN],
  })
  @ApiQuery({
    name: 'rating',
    required: false,
    type: Number,
    description: 'minimum rating',
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('genres') genres: string,
    @Query('pegi') pegi: string,
    @Query('rating') rating: number,
  ) {
    const genresVal = this.convertToArray<Genre>(genres);
    const pegiVal = this.convertToArray<PEGI>(pegi);
    return this.movieService.filter(page, limit, genresVal, pegiVal, rating);
  }

  @Role(RoleName.MODERATOR, RoleName.ADMIN, RoleName.USER)
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the movie with the specified ID.',
    type: Movie,
  })
  findOne(@Param('id') id: string): Observable<Movie> {
    return this.movieService.findById(id, ['stars', 'director']);
  }

  @Role(RoleName.ADMIN)
  @Post()
  @ApiBody({ type: CreateMovieDto, description: 'New movie details' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new movie.',
    type: Movie,
  })
  create(@Body() createMovieDto: CreateMovieDto): Observable<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Role(RoleName.MODERATOR, RoleName.ADMIN)
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiBody({ type: UpdateMovieDto, description: 'Updated movie details' })
  @ApiResponse({
    status: 200,
    description: 'Updates the movie with the specified ID.',
  })
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Observable<UpdateResult> {
    return this.movieService.update(id, updateMovieDto);
  }

  @Role(RoleName.ADMIN)
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 204,
    description: 'Deletes the movie with the specified ID.',
  })
  remove(@Param('id') id: string): Observable<DeleteResult> {
    return this.movieService.delete(id);
  }

  @Role(RoleName.MODERATOR, RoleName.ADMIN)
  @Post(':movieId/director')
  @ApiParam({ name: 'movieId', description: 'Movie ID' })
  @ApiBody({ type: AddDirectorDto, description: 'Director ID' })
  @ApiResponse({
    status: 200,
    description: 'Adds the specified director to the movie.',
  })
  addDirectorToMovie(
    @Param('movieId') movieId: string,
    @Body('directorId') directorId: string,
  ): Observable<Movie> {
    return this.movieService.addDirectorToMovie(movieId, directorId);
  }

  @Role(RoleName.MODERATOR, RoleName.ADMIN)
  @Post(':movieId/stars')
  @ApiBody({ type: AddStarsDto, description: 'Stars ID' })
  @ApiResponse({
    status: 200,
    description: 'Adds the specified director to the movie.',
  })
  addStarsToMovie(
    @Param('movieId') movieId: string,
    @Body('starsIds') starsIds: string[],
  ): Observable<Movie> {
    return this.movieService.addActorsToMovie(movieId, starsIds);
  }
}
