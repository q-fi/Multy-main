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
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { StarService } from './star.service';
import { Star } from './entities/star.entity';
import { CreateStarDto, UpdateStarDto } from './dto/star.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleName } from 'src/user/entities/user.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('stars')
@Controller('stars')
export class StarController {
  constructor(private readonly starService: StarService) {}

  @Role(RoleName.MODERATOR, RoleName.ADMIN, RoleName.USER)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all stars.',
    type: Star,
    isArray: true,
  })
  findAll(): Observable<Star[]> {
    return this.starService.findAll();
  }

  @Role(RoleName.MODERATOR, RoleName.ADMIN, RoleName.USER)
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Star ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the star with the specified ID.',
    type: Star,
  })
  findOne(@Param('id') id: string): Observable<Star> {
    return this.starService.findById(id);
  }

  @Role(RoleName.ADMIN)
  @Post()
  @ApiBody({ type: CreateStarDto, description: 'New star details' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new star.',
    type: Star,
  })
  create(@Body() createStarDto: CreateStarDto): Observable<Star> {
    return this.starService.create(createStarDto);
  }

  @Role(RoleName.MODERATOR, RoleName.ADMIN)
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Star ID' })
  @ApiBody({
    type: UpdateStarDto,
    description: 'Updated star details',
  })
  @ApiResponse({
    status: 200,
    description: 'Updates the star with the specified ID.',
  })
  update(
    @Param('id') id: string,
    @Body() updateStarDto: UpdateStarDto,
  ): Observable<UpdateResult> {
    return this.starService.update(id, updateStarDto);
  }

  @Role(RoleName.ADMIN)
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Star ID' })
  @ApiResponse({
    status: 204,
    description: 'Deletes the star with the specified ID.',
  })
  remove(@Param('id') id: string): Observable<DeleteResult> {
    return this.starService.delete(id);
  }
}
