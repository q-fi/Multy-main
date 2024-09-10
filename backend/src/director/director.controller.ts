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
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { DirectorService } from './director.service';
import { Director } from './entities/director.entity';
import { CreateDirectorDto, UpdateDirectorDto } from './dto/director.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { RoleName } from 'src/user/entities/user.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard,RoleGuard)
@ApiTags('directors')
@Controller('directors')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Role(RoleName.MODERATOR,RoleName.ADMIN,RoleName.USER)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all directors.',
    type: Director,
    isArray: true,
  })
  findAll(): Observable<Director[]> {
    return this.directorService.findAll();
  }

  @Role(RoleName.MODERATOR,RoleName.ADMIN,RoleName.USER)
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Director ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the director with the specified ID.',
    type: Director,
  })
  findOne(@Param('id') id: string): Observable<Director> {
    return this.directorService.findById(id);
  }

  @Role(RoleName.ADMIN)
  @Post()
  @ApiBody({ type: CreateDirectorDto, description: 'New director details' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new director.',
    type: Director,
  })
  create(@Body() createMovieDto: CreateDirectorDto): Observable<Director> {
    return this.directorService.create(createMovieDto);
  }

  @Role(RoleName.MODERATOR,RoleName.ADMIN)
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Director ID' })
  @ApiBody({
    type: UpdateDirectorDto,
    description: 'Updated directors details',
  })
  @ApiResponse({
    status: 200,
    description: 'Updates the director with the specified ID.',
  })
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateDirectorDto,
  ): Observable<UpdateResult> {
    return this.directorService.update(id, updateMovieDto);
  }

  @Role(RoleName.ADMIN)
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 204,
    description: 'Deletes the director with the specified ID.',
  })
  remove(@Param('id') id: string): Observable<DeleteResult> {
    return this.directorService.delete(id);
  }
}
