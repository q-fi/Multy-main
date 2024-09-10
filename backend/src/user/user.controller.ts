import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable, map } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleName, User } from './entities/user.entity';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User activated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id/activate')
  activateUser(@Param('id') id: string, @Res() res: Response): Observable<any> {
    return this.userService.activateUser(id).pipe(
      map(() => {
        res.redirect(`${this.configService.get('clientUrl')}/login`);
      }),
    );
  }

  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User retrieved' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  getUser(@Param('id') id: string): Observable<User> {
    return this.userService.findById(id, ['movies']);
  }

  @Role(RoleName.ADMIN)
  @Put(':id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Updated user details',
  })
  @ApiResponse({
    status: 200,
    description: 'Updates the user with the specified ID.',
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<UpdateResult> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiResponse({ status: 200, description: 'Users retrieved' })
  @ApiResponse({ status: 404, description: 'Users not found' })
  @Get()
  getUsers(): Observable<User[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Role(RoleName.SUDO)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id/change-roles')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: [String], description: 'Array of roles to assign' })
  @ApiResponse({ status: 200, description: 'User roles changed successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  changeRoles(
    @Param('id') id: string,
    @Body() roles: RoleName[],
  ): Observable<UpdateResult> {
    return this.userService.update(id, { roles });
  }

  @ApiBearerAuth()
  @Role(RoleName.MODERATOR, RoleName.ADMIN, RoleName.USER)
  @UseGuards(AuthGuard, RoleGuard)
  @Post(':id/add-to-favourite/:movieId')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiParam({ name: 'movieId', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie added to favourites successfully',
  })
  @ApiResponse({ status: 404, description: 'User or movie not found' })
  addMovieToFavourite(
    @Param('id') userId: string,
    @Param('movieId') movieId: string,
  ): Observable<User | UpdateResult> {
    return this.userService.addMovieToFavourite(userId, movieId);
  }

  @ApiBearerAuth()
  @Role(RoleName.MODERATOR, RoleName.ADMIN, RoleName.USER)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id/delete-from-favourite/:movieId')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiParam({ name: 'movieId', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie removed from favourites successfully',
  })
  @ApiResponse({ status: 404, description: 'User or movie not found' })
  removeMovieFromFavourite(
    @Param('id') userId: string,
    @Param('movieId') movieId: string,
  ): Observable<User | UpdateResult> {
    return this.userService.removeMovieFromFavourite(userId, movieId);
  }
}
